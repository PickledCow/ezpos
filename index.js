
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'pug');

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.render('client', {
        data: 'tests'
    });
});

app.get('/display', function(req, res) {
    res.render('display');
});

io.on('connection', function(socket){
    socket.on('add', function(data) {
        io.emit('add', data);
        console.log(data)
    });
    socket.on('remove', function(data) {
        io.emit('remove', data);
        console.log(data)
    });

    console.log('an user connected');
    socket.on('disconnect', function() {
        console.log('an user ded');
    });
});
http.listen(80);
