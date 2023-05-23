const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 전체 프로젝트 조회
const getAllProjects = async (props) => {
  const project = await prisma.project.findMany(props);

  return project;
};

// 프로젝트 검색
const searchProjects = async (p_id, p_name, start_date, end_date, client) => {
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
  if (start_date !== null) {
    whereClause.start_date = start_date;
  }
  if (end_date !== null) {
    whereClause.end_date = end_date;
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
    },
  });

  return { projects };
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

  const project = rawResults.reduce((acc, curr) => {
    if (!acc.p_id) {
      acc = {
        p_id: curr.p_id,
        p_name: curr.p_name,
        p_description: curr.p_description,
        start_date: curr.start_date,
        end_date: curr.end_date,
        deal_line: curr.deal_line,
        client: curr.client,
        budget: curr.budget,
        employee: [],
      };
    }
    acc.employee.push({
      e_id: curr.e_id,
      position: curr.position,
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

  const data = await prisma.project.create({
    data: {
      p_id: p_id,
      p_name: p_name,
      start_date: start_date,
      end_date: null,
      dead_line: dead_line,
      client: client,
      p_description: p_description,
      budget: budget,
    },
  });
  return data;
};

module.exports = {
  getAllProjects,
  searchProjects,
  getProjectById,
  createProject,
};
