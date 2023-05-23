const express = require("express");
const router = require("./src/router");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('src'));

app.use("/", router);
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/src/public/login.html");
});
app.get("/signup", (req, res) => {
  res.sendFile(__dirname+"/src/public/signup.html");
});
app.get("/main", (req, res) => {
  res.sendFile(__dirname+"/src/public/main.html");
});

// import routers
// const loginRouter = require('./public/login');
// const articleRouter = require('./routes/article');
// const uploadRouter = require('./routes/upload');

// 요청 경로에 따라 router 실행
// app.use('/', loginRouter);
// app.use('/article', articleRouter);
// app.use('/upload', uploadRouter);
// app.get("/signup", (req, res) => {
//   res.sendFile(__dirname+"/src/public/signup.html");
// });

app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
});
