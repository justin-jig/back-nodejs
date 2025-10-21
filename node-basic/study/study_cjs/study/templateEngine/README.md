# template engine 

* 보통 template engine으로 ejs,pug를 사용함
* 보편적으로 ejs를 사용
* 테스트 코드 ( Front에 보내주는 data 테스트 ) 작성할 때 많이 사용 

<% %>
무조건 자바스크립트 코드가 들어가야 하고, 줄바꿈을 할 경우에는 새로운 <% %> 를
이용해야 한다.

<%= %>
값을 템플릿에 출력할 때 사용

<%- include('view의 상대주소') %>
다른 view 파일을 불러올 때 사용
