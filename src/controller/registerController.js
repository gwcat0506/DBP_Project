const { Request, Response, NextFunction } = require("express");
const { registerService } = require("../service");


// 아이디 중복 확인
const checkUser = async (req, res) => {
  const { user_num, user_id, password } = req.body;
  if (!user_num || !user_id || !password)
    return res.status(400).json({ status: 404, message: "모든 값을 입력해주세요." });

  const check = await registerService.checkUser(user_num, user_id, password);

  if (check)
    return res.status(400).json({ status: 404, message: "유저 생성 실패" });

  return res.status(200).json({ status: 200, message: "유저 생성 성공" });
};

module.exports = { checkUser };