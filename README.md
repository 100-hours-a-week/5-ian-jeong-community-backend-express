## 🚀 Intro
---

```
커뮤니티 서비스를 위한 백엔드 서버 프로젝트입니다.
```

<br>

#### Demo



<br>

#### Tech Stacks

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  <img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=Node.js&logoColor=white"/> [![Express](https://img.shields.io/badge/Express-000000?style=plastic&logo=express&logoColor=white)](https://expressjs.com/)


<br>

#### Dev Env

[![MacOS](https://img.shields.io/badge/MacOS-000000?style=plastic&logo=macos&logoColor=black")](https://www.apple.com/macos/big-sur/) [![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-blue?style=plastic&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)



<br>

#### Frontend Servers

__[🔗 Frontend Server - Vanilla](https://github.com/100-hours-a-week/5-ian-jeong-community-frontend-vanilla)__
__[🔗 Frontend Server - React](https://github.com/100-hours-a-week/5-ian-jeong-community-front-react)__




<br><br><br>

## 🗂️ Directory Structure
---

```javascript
community-backend-express
|
| --- app.js  // express 앱의 진입점입니다.
| --- global.js  // 백엔드, 프론트 서버의 IP와 port 번호를 전역변수로 관리합니다.
| --- routes
|        |
|        | --- userRouter.js  // 유저 관련 요청 라우터
|        | --- postRouter.js  // 게시글 관련 요청 라우터
|
| --- controllers
|        |
|        | --- userController.js  // 유저 관련 요청-응답 컨트롤러
|        | --- postController.js  // 게시글 관련 요청-응답 컨트롤러
|
| --- models
|        |
|        | --- validateUtil.js  // 검증 유틸
|        | --- repository  
|                 |
|                 | --- dbConnection.js  // 데이터베이스 커넥션 모듈
|                 | --- userDAO.js  // 데이터베이스에 있는 유저 데이터 접근하게 해주는 DAO
|                 | --- postDAO.js  // 데이터베이스에 있는 게시글 데이터 접근하게 해주는 DAO

```




<br><br><br>


## 🏯 Architecture
---

<img src="./backend-architecture.png" alt="My Image" width="500"/>




아키텍쳐 그림 ㄱㄱ
설명 ㄱ
데이터베이스 스키마 ER 다이어그램 ㄱㄱ설명 ㄱㄱ
요청 응답 흐름 그림ㄱㄱ
설명 ㄱ


<br><br><br>

## 📝 Community Service API
---

RestAPI 설명



<br><br><br>

## 🔍 Details
---

인증 인가 방식 설명
그 외 특이사항 설명










