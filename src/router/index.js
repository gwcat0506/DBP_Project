const Router = require("express");
const projectRouter = require("./projectRouter");
const authRouter = require("./authRouter");
const employeeRouter = require("./employeeRouter");

const router = Router();

router.use("/project", projectRouter);
router.use("/auth", authRouter);
router.use("/employee", employeeRouter);

module.exports = router;
