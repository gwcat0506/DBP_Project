// // 로그인 요청(request, 클라이언트 -> 서버) 미들웨어
// const loginAPI = (user_id, password) => {
//     return function (dispatch, getState, {history}) {
  
//       console.log(user_id, password);
//       // const API = 'http://52.78.12.253/login';
//       const API = "/loginUser";
//       axios.post(API, {
//         // 클라이언트에서 서버로 request(요청)하며 보내주는 데이터
//         // 로그인창에서 클라이언트가 입력하는 데이터
//         "user_id": user_id,
//         "password": password,
//       },
//       {
//         headers : {
//           "Content-Type": "application/json;charset=UTF-8",
//           // 'Content-Type' : 'application/json', //클라이언트가 서버한테 요청하는(원하는) 타입
//           'Accept' : 'application/json', //현재 서버한테 보내는 데이터 타입
//           'Access-Control-Allow-Origin' : '*',
//         },
//       })
//         // 그러면 서버에서 클라이언트로 response(응답)으로 
//         // header에선 token(JWT)이 오고,
//         // body에선 id, name이 온다.
//       .then((response) => {
//         console.log(response)
//         console.log(response.data); // body 데이터
//         console.log(response.headers.authorization);  // undefined getItem
//         console.log('로그인 되었습니다!');
//         localStorage.setItem('Authorization', response.headers.authorization);
//         localStorage.setItem('uid', response.data.id);
//         localStorage.setItem('user_id', response.data.name);
// ;
//           // setUser를 발동시켜서
//           // 리덕스의 is_login 값을 true로 변경한다.
//           let user={
//             uid: response.data.id,   
//             user_id: response.data.name,
            
//           }
//           dispatch(setUser(user))
//           window.alert('로그인 되었습니다!');
//           history.replace('/');
//         }).catch((error) => {
//           console.log(error);
//           window.alert('로그인 실패!')
//         });  
//       };
//     }