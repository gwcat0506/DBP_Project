const Router = require("express");
const { projectController } = require("../controller/");

const router = Router();

router.get("/:projectId", projectController.getProjectById);
router.get("/", projectController.searchProjects);
router.post("/", projectController.createProject);

module.exports = router;
