const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 아이디 중복 확인
const checkUser = async ( user_id ) => {
  const check = await prisma.login_password.findFirst({
    where: {
      login_id: user_id,
    },
  })
  
  return check;
};

// 회원가입(DB저장)
const signupUser = async ( user_num,user_id,password ) => {
  const check = await prisma.login_password.update({

    where: {
      e_id:user_num,
    },
    data: {
      login_id:user_id,
      login_password:password
    },
    
  })
  return check;
};

module.exports = {
    checkUser,signupUser
  };
  
