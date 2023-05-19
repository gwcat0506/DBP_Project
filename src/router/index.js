const Router = require("express");
const userRouter = require("./userRouter");
const projectRouter = require("./projectRouter");
const registerRouter = require("./registerRouter");

const router = Router();

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/register", registerRouter);

module.exports = router;
