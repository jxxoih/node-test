const express = require('express')
var cors = require('cors')
const app = express()

const mysql = require('mysql2');  // mysql 모듈 로드

// [config/index.js] file import 하는거임
// config/index.js 파일에는 node 설정 port DB 연결에 필요한 port, user, password 등의 정보가 있음
const config = require('./config')
const port = config.server.serverport;

// express cors 설정
// origin: 요청한 front 주소
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));



// 
app.get('/', function (req, res) {
    res.send(`
    <h1>Hello world2</h1>
  `)
})

// front 에서 요청한 주소임
app.get('/data', (req, res) => {
    const { p_id } = req.query;
    const { action } = req.query;
    console.log("action", action);
    res.send(`connec`);
    // var query = "";

    // if(action === "getSkill") {
    //     query = "SELECT * FROM `skill`";
    // } else if(action === "getWork") {
    //     console.log("work");
    // }


    // dbConnect(res, query);
})


const dbConnect = (res, query) => {
    // DB 연동
    // config/index.js 에서 수정 가능
    const conn = {  // mysql 접속 설정
        host: config.db.host,
        port: config.db.port,
        user: config.db.username,
        password: config.db.password,
        database: config.db.database
    };

    var connection = mysql.createConnection(conn); // DB 커넥션 생성
    connection.connect();

    connection.query(query, function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        res.json({ "data": results })
    });

    connection.end();
}

app.listen(port);