import { Request, Response } from "express";
import { userService } from "../service";

const getUserById = async (req, res) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId);

  if (!data) {
    return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  }
  return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

//* 유저 생성
const createUser = async (req, res) => {
  const { userName, email, age } = req.body;

  if (!userName || !email || !age)
    return res.status(400).json({ status: 404, message: "유저 생성 실패" });

  const data = await userService.createUser(userName, email, age);

  if (!data)
    return res.status(400).json({ status: 404, message: "유저 생성 실패" });

  return res.status(200).json({ status: 200, message: "유저 생성 성공", data });
};

//* 전체 유저 조회
const getAllUser = async (req, res) => {
  const data = await userService.getAllUser();

  return res
    .status(200)
    .json({ status: 200, message: "유저 전체 조회 성공", data });
};

//* 유저 수정
const updateUser = async (req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  if (!name)
    return res.status(400).json({ status: 404, message: "유저 업데이트 실패" });

  const data = await userService.updateUser(+userId);
  return res
    .status(200)
    .json({ status: 200, message: "유저 업데이트 성공", data });
};

//* 유저 삭제
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  await userService.deleteUser(+userId);

  return res.status(200).json({ status: 200, message: "유저 삭제 성공" });
};

const userController = {
  getUserById,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = userController
// export default userController;
