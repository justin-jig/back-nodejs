const mysql2 = require('mysql2');
// mysql 연결
const conn = mysql2.createConnection({
    host:'localhost', //DB가 설치된 호스트 IP 주소
    user:'justin', // DB 접속 유저 이름
    password:'', // DB접속 비밀번호
    database:'kdt' // DB이름
})
conn.connect((err) => {
    if (err) {
        console.log('error');
        return;
    }
    console.log('connect');
})

exports.getVisitors = (callback) => {
    const query = 'SELECT * FROM visitor';
    conn.query(query, callback)
}

exports.getVisitor = (id, callback) => {
    const query = `SELECT * FROM visitor WHERE id=${id}`;
    conn.query(query, callback)
}

exports.postVisitor = (name,comment, callback) => {
    const query = `INSERT INTO visitor (name,comment) VALUE ('${name}','${comment}')`;
    conn.query(query, callback)
}

exports.patchVisitor = (id, name, comment, callback) => {

    const query = `UPDATE visitor SET name = '${name}',comment = '${comment}' WHERE id = ${id}`;
    conn.query(query, callback)
    
}

exports.deleteVigitor = (id, callback) => {

    const query = `DELETE FROM visitor WHERE id = ${id}`;
    conn.query(query, callback)
}