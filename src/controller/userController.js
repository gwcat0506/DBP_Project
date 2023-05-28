const { Request, Response, NextFunction } = require("express");
const { userService } = require("../service");

const jwt = require("jsonwebtoken");
require("dotenv").config();

// 유저 정보 조회
const getUser = async (req, res) => {
  const token = req.cookies.user;
  if (!token) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  try {
    const user = await userService.getUser(token);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "유저 정보 조회 성공",
      result: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser };
