## 🚀 Intro
---

```
커뮤니티 서비스를 위한 백엔드 서버 프로젝트입니다.
```

<br>

#### Demo

[__🔗 커뮤니티 서비스 데모 영상__](https://youtu.be/JTaqMh2IlZ8)


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




<br><br><br><br><br>

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




<br><br><br><br><br>


## 🏯 Architecture
---

<img src="./backend-architecture.png" alt="My Image" width="500"/>




<br><br>



```
유저에 관한 API와 게시글에 관한 API로 나눠질 수 있습니다.
라우터를 통해 타겟 컨트롤러에 도달할 수 있습니다. 
컨트롤러는 DAO 모듈을 활용해서 데이터베이스에 접근합니다.
```

<br>

#### ✅ Request & Response
```
요청 & 응답의 프로세스를 살펴보겠습니다.
```

__"/users"__ 로 시작하는 요청은 유저 컨트롤러로 향하게 됩니다.
__"/posts"__ 로 시작하는 요청은 게시글 컨트롤러로 향하게 됩니다.

각각 알맞은 컨트롤러에 진입하면 요청에 응하기 위해 데이터베이스에 접근합니다.
이 때, 컨트롤러가 직접 접근하는 것이 아닌 DAO (Data Access Object)라는 모듈을 통해서 간접적으로 접근합니다.
컨트롤러는 DAO를 통해서 데이터베이스의 순수 데이터를 받을 수 있고 요청에 알맞은 로직을 실행한 뒤 응답을 보냅니다.

이렇게 함으로써 요청별 __라우팅의 책임__, __요청에 대한 필요한 로직 수행 책임__, __데이터 베이스 접근 책임__ 으로 분리시킬 수 있습니다.

<br><br>

<img src="./커뮤니티 ERD.png" alt="My Image" width="1500"/>

```
위 사진은 데이터베이스에 적용한 ERD 입니다.
```

__- 세션 테이블__
    제공받은 모듈을 통해서 세션 저장소를 데이터베이스에 적용하면 유저의 별다른 테이블 생성없이 알아서 생성됩니다.
    <br>

__- 유저 테이블__
    유저의 데이터를 칼럼으로 지닙니다.
    데이터베이스에서 유저 생성 시 오토로 부여하는 id 값을 primary key로 사용합니다.
    <br>

__- 게시글 테이블__
    게시글의 데이터를 칼럼으로 지닙니다.
    마찬가지로 데이터베이스에서 유저 생성 시 오토로 부여하는 id 값을 primary key로 사용합니다.  
    게시글에는 작성자가 있기 때문에 유저의 아이디를 foreign key로 가집니다.
    <br>



__- 댓글 테이블__
    댓글의 데이터를 칼럼으로 지닙니다. 
    마찬가지로 데이터베이스에서 유저 생성 시 오토로 부여하는 id 값을 primary key로 사용합니다.  
    댓글이 속하는 게시글과 댓글 작성자가 존재해야하기 때문에 게시글 아이디, 유저 아이디를 foreign Key 사용합니다.

<br><br><br><br><br>

## 📝 Community Service API
---

__<span style="color: blue;">[POST]</span> '/users'__
```
새로운 유저를 생성합니다.
userDAO를 통해서 단일 쿼리를 실행합니다.
```


<br>

__<span style="color: blue;">[POST]</span> '/users/sign-in’__
```
로그인을 위해 검증 요청을 날립니다.
GET으로 날릴 경우 유저가 입력한 이메일, 패스워드를 query parameter로 실어서 보내야 하기때문에 보안에 취약합니다.
POST를 통해 body에 담아서 노출시키지 않음을 의도했습니다.
```


<br>

__<span style="color: orange;">[GET]</span> '/users/email’__
```
회원가입 페이지에서 이메일 중복 검증 요청을 날립니다.
위 경우와는 다르게, 패스워드가 아닌 이메일이기 때문에 GET으로 날렸습니다.
```


<br>


__<span style="color: orange;">[GET]</span> '/users/nickname’__
```
회원가입 페이지에서 닉네임 중복 검증 요청을 날립니다.
위 경우와 마찬가지 입니다.
```


<br>

__<span style="color: orange;">[GET]</span> '/users/:userId’__
```

```


<br>

__<span style="color: purple;">[PATCH]</span> '/users/:userId’__
```


```


<br>

__<span style="color: purple;">[PATCH]</span> '/users/:userId/password’__
```


```


<br>

__<span style="color: red;">[DELETE]</span> '/users/:userId’__
```


```


<br>


__<span style="color: blue;">[POST]</span> ‘/posts’__
```


```


<br>

__<span style="color: orange;">[GET]</span> ‘/posts’__
```


```


<br>

__<span style="color: orange;">[GET]</span> ‘/posts/:postId’__
```


```


<br>

__<span style="color: purple;">[PATCH]</span> ‘/posts/:postId’__
```


```


<br>


__<span style="color: blue;">[POST]</span> ‘/posts/:postId/comments’__
```


```


<br>

__<span style="color: purple;">[PATCH]</span> ‘/posts/:postId/comments/:commentId’__
```


```


<br>


__<span style="color: red;">[DELETE]</span> ‘/posts/:postId/comments/:commentId’__
```


```


<br>

__<span style="color: red;">[DELETE]</span> ‘/posts/:postId’__

```


```


<br>




<br><br><br><br><br>

## 🔍 Details
---

인증 인가 방식 설명
그 외 특이사항 설명










