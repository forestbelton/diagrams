import socketIO from 'socket.io-client';
const socket = socketIO('http://localhost');

function Request(type) {
    return function(data) {
        socket.emit('Request', {type, data});
    };
}

socket.on('connect', function() {
    Request.Identify(socket, {
        boardId: Math.random().toString()
    });
});

function registerStateHandler(callback) {
    socket.on('StateUpdate', callback);
}

export default {
    Identify: Request('Identify'),
    CreateObject: Request('CreateObject'),
    CreateArrow: Request('CreateArrow'),
    Delete: Request('Delete'),
    registerStateHandler
};
