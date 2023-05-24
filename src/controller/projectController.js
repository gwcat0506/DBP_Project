const { Request, Response, NextFunction } = require("express");
const { projectService } = require("../service");

const searchCareer = async (req, res) => {
  const result = await projectService.searchCareer();

  if (!result) {
    return res.status(404).json({ status: 404, message: "경력자순 조회 실패" });
  }

  return res
    .status(200)
    .json({ status: 200, message: "경력자순 조회 성공", result });
};

const searchDeadline = async (req, res) => {
  const result = await projectService.searchDeadline();

  if (!result) {
    return res
      .status(404)
      .json({ status: 404, message: "마감일 최신순 조회 실패" });
  }

  return res
    .status(200)
    .json({ status: 200, message: "마감일 최신순 조회 성공", result });
};

const putEmployees = async (req, res) => {
  const { p_id, employees } = req.body;

  const result = await projectService.putEmployees(p_id, employees);

  if (!result) {
    return res.status(404).json({ status: 404, message: "직원 투입 실패" });
  }

  return res.status(200).json({ status: 200, message: "직원 투입 성공" });
};

const searchProjects = async (req, res) => {
  const { p_id, p_name, start_date, end_date, client } = req.query;

  const result = await projectService.searchProjects(
    p_id,
    p_name,
    start_date,
    end_date,
    client
  );

  return res
    .status(200)
    .json({ status: 200, message: "프로젝트 검색 성공", result });
};

const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  const result = await projectService.getProjectById(projectId);

  if (!result) {
    return res
      .status(404)
      .json({ status: 404, message: "해당 프로젝트가 존재하지 않습니다." });
  }

  return res
    .status(200)
    .json({ status: 200, message: "프로젝트 조회 성공", result });
};

const createProject = async (req, res) => {
  const { p_name, start_date, dead_line, client, p_description, budget } =
    req.body;

  if (
    !p_name ||
    !start_date ||
    !dead_line ||
    !client ||
    !p_description ||
    !budget
  )
    return res
      .status(400)
      .json({ status: 404, message: "요청값이 올바르지 않습니다." });

  const result = await projectService.createProject(
    p_name,
    start_date,
    dead_line,
    client,
    p_description,
    budget
  );

  if (!result)
    return res.status(400).json({ status: 404, message: "프로젝트 생성 실패" });

  return res.status(200).json({ status: 200, message: "프로젝트 생성 성공" });
};

module.exports = {
  searchCareer,
  searchDeadline,
  putEmployees,
  searchProjects,
  getProjectById,
  createProject,
};
