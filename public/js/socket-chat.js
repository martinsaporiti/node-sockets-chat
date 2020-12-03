var socket = io();

var params = new URLSearchParams( window.location.search);

if(!params.has('name') || !params.has('room')){
    window.location = 'index.html';
    throw new Error('The field name and room is required!');
}


var contact = {
    name: params.get('name'),
    room: params.get('room'),
}

socket.on('connect', function() {

    console.log('Connection Stablished');

    socket.emit('beginChat', contact, function(resp){
        // console.log('Connected Contacts', resp);
        renderizeContacts(resp);
    });


});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMessage', function(message) {
    console.log('Server:', message);
    renderizeMessage(message, false);
    scrollBottom();
});

// Listening contacts changes...
socket.on('listContacts', function(contacts) {
    renderizeContacts(contacts);
});

// Private Messages
socket.on('privateMessage', function(message) {
    console.log("privateMessage");
    console.log("Private Message: ", message);
});