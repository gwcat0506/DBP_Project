const Router = require("express");
const { mypageController } = require("../controller");

const router = Router();

router.post("/signup", (req, res) => {
  mypageController.signupUser(req, res)
});
// router.post("/signup/check", (req, res) => {
//   mypageController.checkUser(req, res)
// });
// router.post("/login", (req, res) => {
//   mypageController.loginUser(req, res)
// });


module.exports = router;
