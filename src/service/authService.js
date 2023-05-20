const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 아이디 중복 확인
const checkUser = async ( user_id ) => {
  const check = await prisma.login_password.findFirst({
    where: {
      login_id: user_id
    },
  })
  
  return check;
};

// 회원가입(DB저장)
const signupUser = async ( user_num,user_id,password ) => {
  const check = await prisma.login_password.update({

    where: {
      e_id:user_num
    },
    data: {
      login_id:user_id,
      login_password:password
    },
    
  })
  return check;
};
// 로그인
const loginUser = async ( user_id,password ) => {
  console.log('서비스 실행')
  const user = await prisma.login_password.findFirst({
    //id있는지 check
    where: {
      login_id:user_id,
      login_password:password,
    },
    
  })
  if(user==null){
    return false;
  }else{
    return true;
  }
};

module.exports = {
    checkUser,signupUser,loginUser
  };
  
