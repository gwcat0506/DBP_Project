const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function formatResidentID(residentID) {
  const year = residentID.slice(0, 2);
  const month = residentID.slice(2, 4);
  const day = residentID.slice(4, 6);

  const prefix = parseInt(year) <= 21 ? "20" : "19";
  return `${prefix}${year}-${month}-${day}`;
}

const searchEmployee = async (e_id, e_name, skills, career) => {
  const filters = {};

  if (e_id) {
    filters.e_id = {
      contains: e_id,
    };
  }

  if (e_name) {
    filters.e_name = {
      contains: e_name,
    };
  }

  if (career) {
    filters.career = {
      gte: parseInt(career),
    };
  }

  if (skills) {
    const skillEmployees = await prisma.employee_skill.findMany({
      where: {
        skill: {
          contains: skills,
        },
      },
      select: {
        e_id: true,
      },
    });

    const employeeIds = skillEmployees.map((emp) => emp.e_id);

    if (filters.e_id) {
      filters.e_id = {
        in: employeeIds.filter((id) => filters.e_id.contains.includes(id)),
      };
    } else {
      filters.e_id = {
        in: employeeIds,
      };
    }
  }

  let employees = await prisma.employee.findMany({
    where: filters,
    include: {
      employee_skill: true,
    },
    orderBy: {
      career: "desc",
    },
  });

  employees = employees.map((emp) => {
    const skillStr = emp.employee_skill.map((es) => es.skill).join(", ");
    const birthday = formatResidentID(emp.resident_id);
    return {
      e_id: emp.e_id,
      e_name: emp.e_name,
      career: emp.career,
      skills: skillStr,
      salary: formatCurrency(emp.salary),
      birthday: birthday,
      status: emp.status,
    };
  });

  return { employees };
};

const updateEmployee = async (e_id, salary, status) => {
  const data = await prisma.employee.update({
    where: {
      e_id: e_id,
    },
    data: { salary: salary, status: status },
  });
  return data;
};

const formatCurrency = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

module.exports = {
  searchEmployee,
  updateEmployee,
};
