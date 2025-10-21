const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {

    try {
        const data = fs.readFileSync('./index.html');
        res.writeHead(200);
        res.end(data);

    } catch (error) {
        console.log(error);
        res.writeHead(404);
        res.end(error.message);
    }
})

server.listen(8000, function() {

    console.log('8000번 포트로 실행');

});