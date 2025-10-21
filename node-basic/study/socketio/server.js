const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const app = express();
const PORT = 8000;

// http 서버
const server = http.createServer(app);
// socket 서버
const io = SocketIO(server);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('client');
});

app.get('/hello', (req, res) => {
    res.render('hello');
});

app.get('/chat', (req, res) => {
    res.render('chat');
});

app.get('/practice', (req, res) => {
    res.render('practice');
});

io.on('connection', (socket) => {
    
    // 실습 1
    // socket.on('open_message', (arg, ...arg2) => {
    //     console.log(arg, arg2);
    // })
    // socket.on('form_message', (arg) => {
    //     console.log(arg);
    //     socket.emit('backend_message', arg);
    // })

    // socket.on('button_message', (arg) => {
    //     console.log(`client : ${arg.kind}`);
    //     switch(arg.kind) {
    //         case 'hello': 
    //         socket.emit('backend_button_message', {
    //             kind: arg.kind,
    //             msg : 'hello world'
    //         });
    //         break;
    //         case 'study': 
    //         socket.emit('backend_button_message', {
    //             kind: arg.kind,
    //             msg : 'study hard'
    //         });
    //         break;
    //         case 'bye': 
    //         socket.emit('backend_button_message', {
    //             kind: arg.kind,
    //             msg : 'bye bye good bye'
    //         });
    //         break;
    //     }
    // })


    socket.on("join", (res) => {
        // 채팅방을 생성하는 방법은 join(방아이디) 사용
        console.log("조인 전", socket.rooms);
        socket.join(res);
        socket.room = res;
        console.log('조인 후', socket.rooms);
        //broadcast는 나를 제외한 전체사용자(브라우저)에게 메세지 전달
        socket.broadcast.to(res).emit('create', '사용자와 연결이 되었습니다.');
        const roominfo = io.sockets.adapter.rooms.get(res)?.size;  
        console.log('roominfo', roominfo)

    })

    socket.on("message", (res) => {
        // io.to(특정방아이디).emit(이벤트) // 특정방에 전체 사용자에게 메세지 전달
        console.log(res);
        io.to(socket.room).emit('chat', res);
    })

    socket.on('leave', (res) => {
        socket.leave(socket.room);
        const roominfo = io.sockets.adapter.rooms.get(socket.room)?.size;  
        console.log(roominfo);
    })

})


// 서버
server.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
})  