const Router = require("express");
const { authController } = require("../controller");

const router = Router();

router.post("/login", (req, res) => {
  authController.checkUser(req, res)
});
router.post("/signup", (req, res) => {
  authController.signupUser(req, res)
});

module.exports = router;
