const Router = require("express");
const { projectController } = require("../controller/");

const router = Router();

router.get("/", projectController.searchProjects);

module.exports = router;
