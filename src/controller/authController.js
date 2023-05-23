const { Request, Response, NextFunction } = require("express");
const { authService } = require("../service");


// 아이디 중복 확인
const checkUser = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id )
    return res.status(400).json({ status: 400, success: false, message: "아이디를 입력해주세요." });

  const check = await authService.checkUser(user_id);
  console.log(check)
  if (check)
    return res.status(400).json({ status: 400, success: false, message: "이미 중복되는 아이디가 존재합니다." });

  return res.status(200).json({ status: 200, success: true, message: "사용 가능한 아이디입니다." });
};

// 회원가입(DB저장)
const signupUser = async (req, res) => {
  const { user_num, user_id, password } = req.body;
  if (!user_num || !user_id || !password)
    return res.status(400).json({ status: 404, message: "모든 값을 입력해주세요." });

  const check = await authService.signupUser(user_num, user_id, password);
  try {
    if (check){
      return res.status(200).json({ status: 200, success: true, message: "회원가입 성공" });}
  } catch {
      return res.status(500).json({ status: 500, success: false, message: "회원가입 실패" });}
};

// 로그인
const jwt = require("jsonwebtoken");
require('dotenv').config();

const loginUser = async (req, res) => {
  const { user_id, password } = req.body;
  console.log(user_id,password)

  if (!user_id || !password)
    return res.status(400).json({ status: 404, message: "모든 값을 입력해주세요." });

  const check = await authService.loginUser(user_id, password);
  console.log(check)
  if (check){
    const docs = req.body;
    const payload = { // putting data into a payload
        docs,
    };
    // generating json web token and sending it
    jwt.sign(
      payload, // payload into jwt.sign method
      process.env.SECRET_KEY, // secret key value
      { expiresIn: "30m" }, // token expiration time
      (err, token) => {
          if (err) throw err;
          else {
              return res.status(200).json({ status: 200, success: true, message: "로그인 성공",result:token })
              .cookie('user', token,{maxAge:30*60 * 1000}) // 1000 is a sec
              .end()
              
  }});
  }else{
    return res.status(500).json({ status: 400, success: false, message: "로그인 실패" });}
  // try {
  //   if (check){
  //     // 로그인 성공시 토큰발급
  //     const acc_payload = {
  //       user_id:req.body.user_id,
  //       password:req.body.password

  //     }
  //     const ref_payload = {
  //       user_id:req.body.user_id,
  //       password:req.body.password

  //     }
  //     const access_token = jwt.token().access(acc_payload);
  //     const refresh_payload = jwt.token().refresh(ref_payload);
  //     return res.status(200).json({ status: 200, success: true, message: "로그인 성공",ref_tkn:refresh_token,acc_tkn:access_token });}
  // } catch {
  //     return res.status(500).json({ status: 500, success: false, message: "로그인 실패" });}
};


module.exports = { checkUser,signupUser,loginUser };


