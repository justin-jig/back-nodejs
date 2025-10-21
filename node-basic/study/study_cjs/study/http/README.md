# Node.js 

- 구글 크롬 자바스크립트 엔진 (V8 Engine ) 에 기반해 만들어진 Javascript 런타임
- 이벤트 기반, 비동기 I/O 모델을 사용해 가볍고 효율적


* 런타임이란 ?
  - 프로그래밍 언어가 구동되는 환경

* npm 사용하기

- npm init
	프로젝트를 시작할 때 사용하는 명령어
	package.json에 기록될 내용을 문답식으로 입력한다.

- npm init --yes
	package.json이 생성될 때 기본갑으로 생성된다.

- npm install 패키지 이름
	프로젝트에서 사용할 패키지를 설치하는 명령어
	

* package.json 
 - 패키지들이 서로 의존되어 있어, 문제가 발생할 수 있는데 이를 관리하기 위해 필요한 것
 - 프로젝트에 대한 정보와 사용 중인 패키지 이름 및 버전 정보 가 담겨 있는 파일
 - “name” : 패키지 이름
 - “version” : 패키지의 버전
 - “main” : 자바스크립트 실행 파일 진입점 ( 문답식에서의 entry point )
 - “description” : 패키지에 대한 설명
 - “scripts” : npm run 을 이용해 정해놓는 스크립트 명령어
 - “license” : 해당 패키지의 라이센스

* Node.js 특징
1. 자바스크립트 언어 사용
2. Single Thread
3. Non-blocking I/O
4. 비동기적 Event-Driven





