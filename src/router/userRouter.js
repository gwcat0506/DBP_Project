const Router = require('express');
const userController = require('../controller');

const router = Router();

router.get("/:userId", (req, res) => { console.log('일단은 ㅋㅋ') }
);

//* 유저 생성
// router.post("/", userController.createUser);

// //* 전체 유저 조회
// router.get("/", userController.getAllUser);

// //* 유저 수정
// router.patch("/:userId", userController.updateUser);

// //* 유저 삭제
// router.delete("/:userId", userController.deleteUser);


module.exports = router;
