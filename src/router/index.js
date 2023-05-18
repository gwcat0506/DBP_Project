const Router = require("express");
const userRouter = require("./userRouter");
const projectRouter = require("./projectRouter");

const router = Router();

router.use("/user", userRouter);
router.use("/project", projectRouter);

module.exports = router;
