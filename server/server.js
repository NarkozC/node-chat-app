const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

io.on('connection', socket => {
  console.log('New User Connected')

  socket.emit('newEmail', {
    from: 'dogucan@example.com',
    text: 'Hey, what is going on.',
    createdAt: 123
  })

  socket.emit('newMessage', {
    from: 'dogucan@example.com',
    text: 'Hey, what is going on.',
    createdAt: 123
  })

  socket.on('createMessage', newMessage => {
    console.log('Create Message', newMessage)
  })

  socket.on('createEmail', newEmail => {
    console.log('Create Email', newEmail)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
})

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Started on port: ${port}`)
})
