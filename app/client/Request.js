import socketIO from 'socket.io-client';
const socket = socketIO('http://localhost:4040');

function makeRequest(type) {
    return function(data) {
        socket.emit('Request', {type, data});
    };
}

socket.on('connect', function() {
    Request.Identify({
        boardId: Math.random().toString()
    });
});

function registerStateHandler(callback) {
    socket.on('StateUpdate', callback);
}

var Request = {
    Identify: makeRequest('Identify'),
    CreateObject: makeRequest('CreateObject'),
    CreateArrow: makeRequest('CreateArrow'),
    Delete: makeRequest('Delete'),
    Clear: makeRequest('Clear'),
    registerStateHandler
};

export default Request;
