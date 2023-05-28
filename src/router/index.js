const Router = require("express");
const projectRouter = require("./projectRouter");
const authRouter = require("./authRouter");
const employeeRouter = require("./employeeRouter");
const userRouter = require("./userRouter");

const router = Router();

router.use("/project", projectRouter);
router.use("/auth", authRouter);
router.use("/employee", employeeRouter);
router.use("/user", userRouter);

module.exports = router;
