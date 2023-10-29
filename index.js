const express = require('express')
var cors = require('cors')
const app = express()

const mysql = require('mysql');  // mysql 모듈 로드

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
app.post('/test', (req, res) => {
    const { p_id } = req.query;
    // post 에서 console.log는 터미널어 찍힘
    console.log("p", p_id);

    const query = "SELECT * FROM `skill`";
    dbConnect(res, query);

    // 결과
    // 0
    // : 
    // {s_id: 1, s_name: 'HTML', s_img: 'html.png', s_type: 1, created_at: '2023-10-27T07:12:24.000Z'}
    // 1
    // : 
    // {s_id: 2, s_name: 'CSS', s_img: 'css.png', s_type: 1, created_at: '2023-10-27T07:12:24.000Z'}
    // 2
    // : 
    // {s_id: 3, s_name: 'JavaScript', s_img: 'javascript.png', s_type: 1, created_at: '2023-10-27T07:12:24.000Z'}
    // 3
    // : 
    // {s_id: 4, s_name: 'React', s_img: 'react.png', s_type: 1, created_at: '2023-10-27T07:12:24.000Z'}
    // 4
    // : 
    // {s_id: 5, s_name: 'Java', s_img: 'java.png', s_type: 2, created_at: '2023-10-27T07:12:24.000Z'}
    // 5
    // : 
    // {s_id: 6, s_name: 'Spring', s_img: 'spring.png', s_type: 2, created_at: '2023-10-27T07:12:24.000Z'}
    // 6
    // : 
    // {s_id: 7, s_name: 'PHP', s_img: 'php.png', s_type: 2, created_at: '2023-10-27T07:12:24.000Z'}
    // 7
    // : 
    // {s_id: 8, s_name: 'nodejs', s_img: 'node.png', s_type: 2, created_at: '2023-10-27T07:12:24.000Z'}
    // 8
    // : 
    // {s_id: 9, s_name: 'MySQL', s_img: 'mysql.png', s_type: 3, created_at: '2023-10-27T07:12:24.000Z'}
    // 9
    // : 
    // {s_id: 10, s_name: 'MariaDB', s_img: 'mariadb.png', s_type: 3, created_at: '2023-10-27T07:12:24.000Z'}
    // 10
    // : 
    // {s_id: 11, s_name: 'Git', s_img: 'git.jpeg', s_type: 4, created_at: '2023-10-27T07:12:24.000Z'}
    // 11
    // : 
    // {s_id: 12, s_name: 'GitHub', s_img: 'github.png', s_type: 4, created_at: '2023-10-27T07:12:24.000Z'}
    // 12
    // : 
    // {s_id: 13, s_name: 'Zeplin', s_img: 'zeplin.png', s_type: 5, created_at: '2023-10-27T07:12:24.000Z'}
    // 13
    // : 
    // {s_id: 14, s_name: 'Figma', s_img: 'figma.png', s_type: 5, created_at: '2023-10-27T07:12:24.000Z'}
    // 14
    // : 
    // {s_id: 15, s_name: 'Thymeleaf', s_img: 'thymeleaf.png', s_type: 1, created_at: '2023-10-27T07:12:24.000Z'}
    // 15
    // : 
    // {s_id: 16, s_name: 'TEST', s_img: 'test.png', s_type: 1, created_at: '2023-10-27T09:34:57.000Z'}
    // 16
    // : 
    // {s_id: 17, s_name: 'TEST', s_img: 'test.png', s_type: 1, created_at: '2023-10-27T09:34:57.000Z'}
})


const dbConnect = (res, query) => {
    // DB 연동
    // config/index.js 에서 수정 가능
    const conn = {  // mysql 접속 설정
        host: config.db.host,   // 127.0.0.1
        port: config.db.port,   // 3380
        user: config.db.username,   // jiho
        password: config.db.password,   // 1111
        database: config.db.database    // test
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