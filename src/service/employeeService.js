const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    const { employee_skill, ...rest } = emp;
    return { ...rest, skills: skillStr };
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

module.exports = {
  searchEmployee,
  updateEmployee,
};
