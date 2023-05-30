const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 평가 점수 평균 계산 함수
function calculateAverage(evaluations) {
  let total_work_score = 0;
  let total_communication_score = 0;

  for (let evaluation of evaluations) {
    total_work_score += evaluation.working_score;
    total_communication_score += evaluation.communication_score;
  }

  const work_avg = total_work_score / evaluations.length;
  const com_avg = total_communication_score / evaluations.length;

  return {
    work_avg,
    com_avg,
  };
}

// 평가 조회
const getEvaluationById = async (e_id, p_id) => {
  const pm_customer_evaluations = await prisma.evaluate_pm_customer.findMany({
    where: {
      e_id: e_id,
      p_id: p_id,
    },
  });

  const colleague_evaluations = await prisma.evaluate_colleague.findMany({
    where: {
      e_id: e_id,
      p_id: p_id,
    },
  });

  const pm =
    pm_customer_evaluations.find(
      (evaluation) => evaluation.estimator_type === "PM"
    ) || {};
  const customer =
    pm_customer_evaluations.find(
      (evaluation) => evaluation.estimator_type === "CUSTOMER"
    ) || {};

  const pm_avg_scores = calculateAverage([pm]);
  const customer_avg_scores = calculateAverage([customer]);
  const colleague_avg_scores = calculateAverage(colleague_evaluations);

  if (!pm.working_comment) pm.working_comment = "미기입";
  if (!pm.communication_comment) pm.communication_comment = "미기입";
  if (!customer.working_comment) customer.working_comment = "미기입";
  if (!customer.communication_comment)
    customer.communication_comment = "미기입";

  for (let i = 0; i < colleague_evaluations.length; i++) {
    if (!colleague_evaluations[i].working_comment)
      colleague_evaluations[i].working_comment = "미기입";
    if (!colleague_evaluations[i].communication_comment)
      colleague_evaluations[i].communication_comment = "미기입";
  }

  ["p_id", "e_id", "estimator_type"].forEach((field) => {
    delete pm[field];
    delete customer[field];
    colleague_evaluations.forEach((evaluation) => delete evaluation[field]);
  });

  const response = {
    pm: {
      ...pm,
    },
    customer: {
      ...customer,
    },
    peer: {
      evaluation: colleague_evaluations,
      avg_score: {
        work_avg: colleague_avg_scores.work_avg,
        com_avg: colleague_avg_scores.com_avg,
      },
    },
  };

  return response;
};

// 직원 평가순 조회
const searchScore = async () => {
  const rawResults = await prisma.$queryRaw`
  select e.e_id, e.e_name, round(s.avg_work, 2) as avg_work, round(s.avg_com, 2) as avg_com
from employee e
left join (
select e_id, avg(avg_work) as avg_work, avg(avg_com) as avg_com
from(
    (select e_id, avg(working_score) as avg_work, avg(communication_score) as avg_com
    from evaluate_colleague
    group by e_id)
    union all
    (select e_id, avg(working_score) as avg_work, avg(communication_score) as avg_com
    from evaluate_pm_customer
    group by e_id)) as score
group by e_id) as s on s.e_id = e.e_id
order by avg_work desc, avg_com desc`;

  if (rawResults.length === 0) {
    return null;
  }

  const checkNull = (value) => (value ? value : "기록 없음");

  const employees = rawResults.map((curr) => ({
    e_id: curr.e_id,
    e_name: curr.e_name,
    avg_work: checkNull(curr.avg_work),
    avg_com: checkNull(curr.avg_com),
  }));

  return employees;
};

// 직원 경력순 조회
const searchCareer = async () => {
  const rawResults = await prisma.$queryRaw`
  select e.e_id, e.e_name, e.career, es.skills from employee e
  left join (select e_id, GROUP_CONCAT(skill separator ',') as skills
            from employee_skill
            group by e_id) as es on e.e_id = es.e_id
  order by e.career desc;`;

  if (rawResults.length === 0) {
    return null;
  }

  const checkNull = (value) => (value ? value : "해당 없음");

  const employees = rawResults.map((curr) => ({
    e_id: curr.e_id,
    e_name: curr.e_name,
    career: curr.career,
    skills: checkNull(curr.skills),
  }));

  return employees;
};

// 직원 별 프로젝트 마감일 조회
const searchDeadline = async () => {
  const rawResults = await prisma.$queryRaw`
    select e.e_id, e.e_name, p.p_name, p.start_date, p.dead_line
    from employee e
    left join (select p.p_id, p.p_name, pe.e_id, p.start_date, p.dead_line
    from project_employee pe
    join project p on p.p_id = pe.p_id
    where put_out_date is null) as p on e.e_id = p.e_id
    order by dead_line`;

  if (rawResults.length === 0) {
    return null;
  }

  const formatDate = (date) =>
    date ? date.toISOString().slice(0, 10) : "미참여";
  const checkNull = (value) => (value ? value : "미참여");

  const employees = rawResults.map((curr) => ({
    e_id: curr.e_id,
    e_name: curr.e_name,
    p_name: checkNull(curr.p_name),
    start_date: formatDate(curr.start_date),
    dead_line: formatDate(curr.dead_line),
  }));

  return employees;
};

// 프로젝트 직원 투입
const putEmployees = async (p_id, employees) => {
  const currentDate = new Date().toISOString();

  const employeeData = employees.map((employee) => ({
    p_id: p_id,
    e_id: employee.e_id,
    position: employee.position,
    put_in_date: currentDate,
    put_out_date: null,
  }));

  await prisma.project_employee.createMany({
    data: employeeData,
  });

  return employeeData;
};

// 프로젝트 검색
const searchProjects = async (p_id, p_name, start_date, end_date, client) => {
  // 인용 부호 제거
  let clean_start_date =
    start_date !== undefined ? start_date.replace(/['"]+/g, "") : null;
  let clean_end_date =
    end_date !== undefined ? end_date.replace(/['"]+/g, "") : null;

  const whereClause = {};
  if (p_id !== null) {
    whereClause.p_id = {
      contains: p_id,
    };
  }
  if (p_name !== null) {
    whereClause.p_name = {
      contains: p_name,
    };
  }
  if (clean_start_date !== null && clean_end_date !== null) {
    whereClause.OR = [
      {
        AND: [
          {
            start_date: {
              gte: new Date(clean_start_date),
            },
          },
          {
            end_date: {
              lte: new Date(clean_end_date),
            },
          },
        ],
      },
      {
        AND: [
          {
            start_date: {
              gte: new Date(clean_start_date),
            },
          },
          {
            end_date: null,
          },
        ],
      },
    ];
  } else if (clean_start_date !== null) {
    whereClause.start_date = {
      gte: new Date(clean_start_date),
    };
  } else if (clean_end_date !== null) {
    whereClause.OR = [
      {
        end_date: {
          lte: new Date(clean_end_date),
        },
      },
      {
        end_date: null,
      },
    ];
  }
  if (client !== null) {
    whereClause.client = {
      contains: client,
    };
  }
  const projects = await prisma.project.findMany({
    where: whereClause,
    select: {
      p_id: true,
      p_name: true,
      start_date: true,
      end_date: true,
      client: true,
      budget: true,
      p_description: true,
    },
    orderBy: [
      { end_date: "asc" }, // 먼저 끝나는 프로젝트를 우선으로 함
    ],
  });

  const formattedProjects = projects
    .map((project) => ({
      ...project,
      start_date: project.start_date
        ? project.start_date.toISOString().slice(0, 10)
        : null,
      end_date: project.end_date
        ? project.end_date.toISOString().slice(0, 10)
        : "진행 중", //end_date가 null인 경우
    }))
    .sort((a, b) => {
      if (a.end_date === "진행 중") return -1;
      if (b.end_date === "진행 중") return 1;
      return 0;
    });

  return { projects: formattedProjects };
};

// 프로젝트 상세 조회
const getProjectById = async (projectId) => {
  const rawResults = await prisma.$queryRaw`
    SELECT *
    FROM project 
    LEFT JOIN project_employee ON project.p_id = project_employee.p_id
    LEFT JOIN employee ON project_employee.e_id = employee.e_id
    WHERE project.p_id = ${projectId};
  `;

  if (rawResults.length === 0) {
    return null;
  }

  const formatDate = (date) =>
    date ? date.toISOString().slice(0, 10) : "진행 중";

  const project = rawResults.reduce((acc, curr) => {
    if (!acc.p_id) {
      acc = {
        p_id: curr.p_id,
        p_name: curr.p_name,
        p_description: curr.p_description,
        start_date: formatDate(curr.start_date),
        end_date: formatDate(curr.end_date),
        dead_line: formatDate(curr.dead_line),
        client: curr.client,
        budget: formatCurrency(curr.budget),
        employee: [],
      };
    }
    acc.employee.push({
      e_id: curr.e_id,
      position: curr.position,
      put_in_date: formatDate(curr.put_in_date),
      e_name: curr.e_name,
    });

    return acc;
  }, {});

  return { project };
};

// 프로젝트 생성
const createProject = async (
  p_name,
  start_date,
  dead_line,
  client,
  p_description,
  budget
) => {
  const lastProject = await prisma.project.findFirst({
    orderBy: { p_id: "desc" },
  });

  let p_id = "P0001";
  if (lastProject) {
    const lastPId = lastProject.p_id;
    const lastNumber = parseInt(lastPId.substr(1));
    p_id = `P${("0000" + (lastNumber + 1)).slice(-4)}`;
  }
  // const formatDate = (date) => date.toISOString().slice(0, 10);
  const data = await prisma.project.create({
    data: {
      p_id: p_id,
      p_name: p_name,
      start_date: new Date(start_date),
      end_date: null,
      dead_line: new Date(dead_line),
      client: client,
      p_description: p_description,
      budget: budget,
    },
  });
  
  return data.p_id;
};

const formatCurrency = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

module.exports = {
  getEvaluationById,
  searchScore,
  searchCareer,
  searchDeadline,
  putEmployees,
  searchProjects,
  getProjectById,
  createProject,
};
