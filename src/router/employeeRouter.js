const Router = require("express");
const { employeeController } = require("../controller/");

const router = Router();

router.get("/", employeeController.searchEmployee);

module.exports = router;
