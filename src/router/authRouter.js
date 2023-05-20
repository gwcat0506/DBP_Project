const Router = require("express");
const { authController } = require("../controller");

const router = Router();

router.post("/signup", (req, res) => {
  authController.signupUser(req, res)
});
router.post("/signup/check", (req, res) => {
  authController.checkUser(req, res)
});
router.post("/login", (req, res) => {
  authController.loginUser(req, res)
});


module.exports = router;
