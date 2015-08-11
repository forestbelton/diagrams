import socketIO from 'socket.io-client';
const socket = socketIO(require('websocketUrl'));

function makeRequest(type) {
    return function(data) {
        socket.emit('Request', {type, data});
    };
}

socket.on('connect', function() {
    const urlParts = document.URL.split("/");
    Request.Identify({
        boardId: urlParts[urlParts.length - 1]
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
