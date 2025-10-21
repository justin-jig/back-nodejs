# KDT-WEB-9 20230808

node 실습 코드 01

sequelize 로 변경하기

사용 기능 :  middleware, express, ejs 

db : mysql
CREATE TABLE user2 (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	userid VARCHAR(20) NOT NULL,
	name VARCHAR(10) NOT NULL,
	pw VARCHAR(20) NOT NULL
);

회원가입, 프로필, 로그인 화면 구현

GET /user : 환영 메세지와 함께 회원가입 및 로그인 링크를 보여줌(index.ejs)
	- 회원가입 링크 클릭 => GET /user/siginup
	- 로그인 링크 클릭 => GET /user/sigin

GET /user/signup : 회원가입 폼을 보여줌 (sigup.ejs)
POST /user/signup : [회원가입] 버튼 클릭 -> 입력 정보 DB 저장 => 성공(true) 응답


GET /user/signin : 로그인 폼을 보여줌 (sigup.ejs)
POST /user/signin : [로그인] 버튼 클릭 -> DB에서 해당 정보 조회 => 성공(true) 응답


POST /user/profile
	- 로그인 성공 시 : 로그인 한 사람의 정보를 input에 값을 입력해 보여줌 (profile.ejs)
	- 로그인 실패 시 : /user/signin 리다이렉트

POST /user/profile/edit :  프로필 페이지에서[수정] 버튼 클릭 => 입력 정보 DB 수정 => 회원정보 성공 수정 메세지 응답

POST /user/profile/dlete : 프로필 페이지에서[삭제] 버튼 클릭 => 입력 정보 DB 삭제 => /user/signin 리다이렉트




