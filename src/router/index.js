const Router = require("express");
const userRouter = require("./userRouter");
const projectRouter = require("./projectRouter");
const authRouter = require("./authRouter");

const router = Router();

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/auth", authRouter);



module.exports = router;
