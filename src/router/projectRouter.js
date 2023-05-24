const Router = require("express");
const { projectController } = require("../controller/");

const router = Router();

router.get("/:projectId", projectController.getProjectById);
router.get("/", projectController.searchProjects);
router.post("/putEmpoyee", projectController.putEmployees);
router.post("/", projectController.createProject);
router.get("/putEmployee/deadline", projectController.searchDeadline);

module.exports = router;
