const Router = require("express");
const { userController } = require("../controller");

const router = Router();

// 내 정보 조회
router.get("/", userController.getUser);

module.exports = router;
