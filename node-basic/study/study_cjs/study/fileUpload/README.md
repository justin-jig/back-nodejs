# express.js body parsser , multer

• 파일 업로드를 위해 사용되는 미들웨어
• express로 서버를 구축할 때 가장 많이 사용되는 미들웨어

• 경로 뿐 아니라 파일명, 파일 크기 등을 직접 지정, 제어하고 싶다면?
• storage : 저장할 공간에 대한 정보
• diskStorage : 파일을 디스크에 저장하기 위한 모든 제어 기능을 제공
• destination : 저장할 경로
• filename : 파일명
• limits : 파일 제한
• fileSize : 파일 사이즈 제한


• single() : 하나의 파일 업로드
  - req.file : 파일 하나
  - req.body : 나머지 정보
• array() : 여러 파일을 업로드할 때 사용, 하나의 요청 안에 여러 개의 파
일이 존재할 때
  - req.files : 파일 n개
  - req.body : 나머지 정보

• fields() : 여러 파일을 업로드할 때 사용, 하나의 요청이 아닌 여러 개의
요청이 들어올 때
 - req.files : 파일 n개
 - req.body : 나머지 정보