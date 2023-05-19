const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const bcrypt = require("bcrypt");

// 아이디 중복 확인
const checkUser = async (user_num, user_id, password) => {
  const check = await prisma.login_password.findFirst({
    where: {
      login_id: user_id,
    },
  })
  
  return check;
};

module.exports = {
    checkUser
  };
  
