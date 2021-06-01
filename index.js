const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const bodyParser = require("body-parser");

const config = require("./config/key");
const app = express();
const port = 3000;

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

// DB 연결
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) =>
  res.send("안녕하세요. Root 페이지 입니다요 케케케루루!!")
);

app.post("/register", (req, res) => {
  // 회원가입할때 필요한 정보들을 client 에서 가져오면 그것들을 DB에 넣어준다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
