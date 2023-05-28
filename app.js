const express = require("express");
const router = require("./src/router");

const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const PORT = 3000;

app.use(express.json());
app.use(express.static("src"));

app.use("/api", router);

// 로그인 페이지
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/public/login.html");
});
// 회원가입 페이지
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/src/public/signup.html");
});
// 프로젝트 조회(main) 페이지
app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/src/public/main.html");
});
// 마이페이지
app.get("/mypage", (req, res) => {
  res.sendFile(__dirname + "/src/public/mypage.html");
});
// 직원 조회 페이지
app.get("/employee", (req, res) => {
  res.sendFile(__dirname + "/src/public/employee.html");
});
// 프로젝트 상세조회
app.get("/pr", (req, res) => {
  res.sendFile(__dirname + "/src/public/projectinquiry.html");
});
// 프로젝트 추가 - 직원 조회
app.get("/add", (req, res) => {
  res.sendFile(__dirname + "/src/public/pj_push.html");
});

// 프로젝트 평가 페이지
app.get("/evaluate", (req, res) => {
  res.sendFile(__dirname + "/src/public/project_eval.html");
});

// 프로젝트 생성 페이지
app.get("/prcreate", (req, res) => {
  res.sendFile(__dirname+"/src/public/projectcreate.html");
});

// 오시는 길 페이지
app.get("/roadmap", (req, res) => {
  res.sendFile(__dirname+"/src/public/roadmap.html");
});

// 사원 정보 갱신 페이지
app.get("/empinfo", (req, res) => {
  res.sendFile(__dirname+"/src/public/emp_info.html");
});

//서버 시작
app.listen(PORT, () => {
  console.log(`
        #############################################
            🛡️ Server listening on port: ${PORT} 🛡️
        #############################################
    `);
});
