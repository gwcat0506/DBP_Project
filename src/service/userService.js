const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
require("dotenv").config();

// 유저 조회
const getUser = async (token) => {
  // 토큰을 이용하여 유저 식별 정보를 가져옴
  const loginId = getUserIdFromToken(token);
  console.log(loginId);

  // 유저 정보 조회
  const user = await prisma.login_password.findUnique({
    where: {
      login_id: loginId,
    },
    include: {
      employee: true,
    },
  });

  const result = {
    e_id: user.employee.e_id,
    e_name: user.employee.e_name,
    login_id: user.login_id,
    login_password: user.login_password,
    resident_id: formatResidentID(user.employee.resident_id),
    education: user.education,
    career: user.employee.career,
    salary: user.employee.salary,
  };

  return result;
};

// 토큰에서 유저 아이디 추출
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.docs.user_id; // 토큰 해독하여 사용자 ID 받기
  } catch (error) {
    throw new Error("토큰 해독 실패");
  }
};

function formatResidentID(residentID) {
  const year = residentID.slice(0, 2);
  const month = residentID.slice(2, 4);
  const day = residentID.slice(4, 6);

  const prefix = parseInt(year) <= 21 ? "20" : "19";
  return `${prefix}${year}-${month}-${day}`;
}

module.exports = { getUser };
