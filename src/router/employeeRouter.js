const Router = require("express");
const { employeeController } = require("../controller/");

const router = Router();

router.post("/:e_id", employeeController.updateEmployee);
router.post("/", employeeController.searchEmployee);

module.exports = router;
