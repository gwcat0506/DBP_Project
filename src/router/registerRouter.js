const Router = require("express");
const { registerController } = require("../controller/");

const router = Router();

router.post("/", (req, res) => {
  registerController.checkUser(req, res)
});

module.exports = router;
