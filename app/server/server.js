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
      board = boardId;
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

  socket.on('Request', (data) => {
    switch(data.type) {
      case 'Identify': {
        // acknowledge they have connected
        boards[data.data.boardId] = boards[data.data.boardId] || [];
        connections[data.data.boardId] = connections[data.data.boardId] || [];

        socket.emit('Response', {status: 'Success'});
        connections[data.data.boardId].push(socket);

        // send current state of the board they are connected to
        socket.emit('StateUpdate', boards[data.data.boardId]);

        break;
      }
      case 'CreateObject':
      case 'CreateArrow':
      case 'Delete': {
        let boardId = getBoardBySocket(socket);
        if(boardId != null) {
          socket.emit('Response', {status: 'Success'});
          boards[boardId].push(data.data);

          sendNewState(boardId);
        } else {
          socket.emit('Response', {status: 'Failure'});
        }
        break;
      }
    }
  });

  socket.on('disconnect', () => {
    leave(socket);
  });
});
