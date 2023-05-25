const express = require("express");
const router = require("./src/router");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('src'));

app.use("/", router);

//라우트 핸들러
app.get("/", (req, res) => {
  res.sendFile(__dirname+"/src/public/login.html");
});
app.get("/signup", (req, res) => {
  res.sendFile(__dirname+"/src/public/signup.html");
});
app.get("/main", (req, res) => {
  res.sendFile(__dirname+"/src/public/main.html");
});
app.get("/mypage", (req,res) => {
  res.sendFile(__dirname+"/src/public/mypage.html")
})

//서버 시작
app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
});
