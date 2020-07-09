/*
 * @Description:  封装socket.io
 * @Version: 1.0
 * @Autor: 王强
 * @Date: 2020-07-09 08:51:29
 * @LastEditors: 王强
 * @LastEditTime: 2020-07-09 10:47:36
 */

const socket_io = require('socket.io');
const socketio = {};
const users = [];       // 用户集合

//获取io  
socketio.getSocketio = function (server) {
    const io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        // console.log('用户连接成功了',socket.id);
        socket.on('userlogin', function (data) {
            socketio.name = socket.id
            data.socketid = socket.id   // 赋值 socketid
            data.onlineStatus = 1       // 改变用户在线状态
            users.push(data);
            socket.emit('getUser', data);
        })
    })
};

module.exports = socketio;  