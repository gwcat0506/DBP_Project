const { Request, Response, NextFunction } = require("express");
const { employeeService } = require("../service");

const searchEmployee = async (req, res) => {
  const { e_id, e_name, skills, career } = req.query;

  const result = await employeeService.searchEmployee(
    e_id,
    e_name,
    skills,
    career
  );

  return res
    .status(200)
    .json({ status: 200, message: "사원 검색 성공", result });
};

module.exports = { searchEmployee };
