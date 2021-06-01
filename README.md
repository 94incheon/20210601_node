# Node & React

## 패키지 설치

```shell
npm install nodemon --save-dev
npm install express --save
npm install mongoose --save
npm install body-parser --save
```

## 환경변수 설정분리하기

- config 파일 참고

## Bcrypt 로 PW 암호화하기

- 비크립트 라이브러리 설치하기
  - 암호화 순서
    - 먼저 Register Route 로 가기

```shell
npm install bcrypt --save
```

```node
// models/User.js

userSchema.pre("save", (next) => {
  let user = this;

  // 유저정보를 저장하기전에 비밀번호를 암호화 시킨다.
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
```
