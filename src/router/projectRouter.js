const Router = require("express");
const { projectController } = require("../controller/");

const router = Router();

router.get("/:projectId", projectController.getProjectById);
router.get("/", projectController.searchProjects);
router.post("/putEmployee", projectController.putEmployees);
router.post("/", projectController.createProject);
router.get("/putEmployee/deadline", projectController.searchDeadline);
router.get("/putEmployee/career", projectController.searchCareer);
router.get("/putEmployee/score", projectController.searchScore);
router.get("/evaluation/:e_id/:p_id", projectController.getEvaluationById);
router.patch("/putout", projectController.putOutEmployee);

module.exports = router;
