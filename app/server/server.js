let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(4040);

let boards = {}; // state
let connections = {};

// UTILITY FUNCTIONS

let getBoardBySocket = (socket) => {
  let board = null;
  Object.keys(connections).forEach(boardId => {
    if(connections[boardId].indexOf(socket) != -1) {
      board = cs;
    }
  });

  return board;
};

let sendNewState = (boardId) => {
  let state = boards[boardId];
  connections[boardId].forEach(socket => {
    socket.emit('StateUpdate', state);
  });
};

let leave = (socket) => {
  Object.keys(connections).forEach(boardId => {
    let index = connections[boardId].indexOf(socket);
    if(index != -1) {
      connections[boardId].splice(index, 1);
    }
  });
};

// EXPRESS

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
});

app.get('/board/:id', (req, res) => {
  console.log(req.params.id);
});

// SOCKET.IO

io.on('connection', (socket) => {
  socket.on('Identify', (data) => {
    // acknowledge they have connected
    boards[data.board] = boards[data.boards] || [];

    socket.emit('Response', {status: 'Success'});
    connections[data.board].push(socket);

    // send current state of the board they are connected to
    socket.emit('StateUpdate', boards[data.board]);
  });

  socket.on('CreateObject', (data) => {
    let boardId = getBoardBySocket(socket);
    if(boardId != null) {
      socket.emit('Response', {status: 'Success'});
      boards[boardId].push(data);

      sendNewState(boardId);
    } else {
      socket.emit('Response', {status: 'Failure'});
    }
  });

  socket.on('CreateArrow', (data) => {
    let boardId = getBoardBySocket(socket);
    if(boardId != null) {
      socket.emit('Response', {status: 'Success'});
      boards[boardId].push(data);

      sendNewState(boardId);
    } else {
      socket.emit('Response', {status: 'Failure'});
    }
  });

  socket.on('Delete', (data) => {
    let boardId = getBoardBySocket(socket);
    if(boardId != null) {
      socket.emit('Response', {status: 'Success'});
      boards[boardId].push(data);

      sendNewState(boardId);
    } else {
      socket.emit('Response', {status: 'Failure'});
    }
  });

  socket.on('disconnect', () => {
    leave(socket);
  });
});
