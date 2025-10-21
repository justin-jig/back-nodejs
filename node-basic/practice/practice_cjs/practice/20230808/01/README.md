# KDT-WEB-9 20230808

node 실습 코드 01

사용 기능 :  middleware, express, ejs 

db : mysql

user 테이블 만들기
CREATE TABLE user2 (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	userid VARCHAR(20) NOT NULL,
	name VARCHAR(10) NOT NULL,
	pw VARCHAR(20) NOT NULL
);


