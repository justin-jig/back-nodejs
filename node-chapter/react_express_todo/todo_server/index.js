const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;
const db = require('./models/index.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const whitelist = ["http://localhost:8000", "http://localhost:3000"];

const corsOptions = {
    origin: function (origin, callback) { 
      if (whitelist.indexOf(origin) !== -1) { // 만일 whitelist 배열에 origin인자가 있을 경우
        callback(null, true); // cors 허용
      } else {
        callback(new Error("Not Allowed Origin!")); // cors 비허용
      }
    },
  };

//CORS오류방지
app.use(cors(corsOptions)); // 옵션을 추가한 CORS 미들웨어 추가

//router 분리
const router = require("./routes");
app.use("/", router);

//오류처리
app.use("*", (req, res) => {
    res.status(404).render("404");
});

db.sequelize.sync({
    force:false
}).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
})
