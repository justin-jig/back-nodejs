import mysql2 from 'mysql2';


const conn = mysql2.createConnection({
    host : 'localhost', // DB 설치된 호스트 IP
    user : 'justin', //DB 접속 유저 이름
    password: '', // DB 접속 비밀번호
    database : 'kdtpractice'
})

conn.connect ((err) => {
    if (err) {
        console.log('error');
        return;
    }
    console.log('connect');
})


// POST /user/signup 회원가입
export const postUserSignUp = (userid, pw, name, callback) => {

    const qurey = `INSERT INTO user2 (userid,name,pw) VALUES ('${userid}', '${name}', '${pw}')`;
    conn.query(qurey, callback);
}

// 유저 검색
export const postUserSearch = ( userid, callback) => {
    const query = `SELECT * FROM user2 WHERE userid= "${userid}"`
    conn.query(query, callback);

}

// 유저 수정
export const updateUser = (querymdified, id, callback) => {
    const query = `UPDATE user2 SET ${querymdified} WHERE userid= "${id}"`
    conn.query(query, callback);

}

// 유저 삭제
export const deleteUser = ( userid, callback) => {
    const query = `DELETE FROM user2 WHERE userid= "${userid}"`
    conn.query(query, callback);
}

