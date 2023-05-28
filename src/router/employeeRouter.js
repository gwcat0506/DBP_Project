const Router = require("express");
const { employeeController } = require("../controller/");

const router = Router();


router.patch("/:e_id", employeeController.updateEmployee);
router.get("/", employeeController.searchEmployee);

module.exports = router;
