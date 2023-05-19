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
  return await prisma.project.findMany({
    where: whereClause,
    select: {
      p_id: true,
      p_name: true,
      start_date: true,
      end_date: true,
      client: true,
    },
  });
};

module.exports = {
  getAllProjects,
  searchProjects,
};
