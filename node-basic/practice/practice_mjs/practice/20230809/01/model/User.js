import mysql from 'mysql2/promise';

//mysql 연결


/** createConnection : 단일연결, 매번 연결이 필요할 때마다 새로운 연결이 생김
 * 연결수가 많아지면 성능에 영향이 생김.
 * const conn = mysql.createConnection({
    host: 'localhost',
    user: 'justin',
    password: '',
    database: 'kdtpractice',
    port: 3306,
    });
    
    conn.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connect');
});
*/

/** createPool : 여러연결, 여러개의 연결을 미리 생성하고 관리
 *  요청이 들어올때마다 생성한 열결을 할당. 동시처리 가능
 */

const conn = mysql.createPool({
    host: 'localhost',
    user: 'justin',
    password: '',
    database: 'kdtpractice',
    port: 3306,
});


export const post_signup = async (data) => {

    try {
        const query = 'INSERT INTO user (userid, pw, name) VALUES (?, ?, ?)';
        await conn.query(query, [data.userid, data.pw, data.name])
    } catch (error) {
        console.log(error);
    }
}


export const post_signin = async (data) => {

    try {
        const query = 'SELECT * FROM user WHERE userid=? AND pw=?';
        const [rows] = await conn.query(query, [data.userid, data.pw])
        return rows;
    
    } catch (error) {
        console.log(error);
    }
};

export const post_profile = async (data) => {

    try {
        const query = 'SELECT * FROM user WHERE userid=?';
        const [rows] = await conn.query(query, [data.userid])
        return rows;
    
    } catch (error) {
        console.log(error);
    }
};

export const edit_profile = async (data) => {

    try {
        const query = 'SELECT * FROM user WHERE userid=?';
        const [rows] = await conn.query(query, [data.userid, data.pw, data.name, data.id])
        return rows;
    
    } catch (error) {
        console.log(error);
    }
};

export const delete_profile = async (id) => {
    try {
        const query = 'DELETE FROM user WHERE id=?';
        const [rows] = await conn.query(query, [id])
        return rows;
    
    } catch (error) {
        console.log(error);
    }
};
