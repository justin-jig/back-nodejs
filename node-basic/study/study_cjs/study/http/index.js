
// const mod = require('./module');
// const { a, b } = require('./module');
// console.log(mod);

const http =  require('http')

const server = http.createServer(function(req, res) {

    console.log(res, req);
    res.writeHead(200);
    res.write("<h1>Hello World</h1>");
    res.end("<p>end</p>")

});

server.listen(8000, function() {

    console.log('8000번 포트로 실행');

});