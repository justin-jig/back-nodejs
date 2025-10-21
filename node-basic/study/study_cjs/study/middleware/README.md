#  middleWrare 

• 요청이 들어옴에 따라 응답까지의 중간 과정을 함수로 분리한 것
• 서버와 클라이언트를 이어주는 중간 작업
• use() 를 이용해 등록할 수 있다.


static
• 이미지, css 파일 및 Javascript 파일(front)과 같은 정적 파일 제공
• Express 에 있는 static 메소드를 이용해 미들웨어로 로드

express.static