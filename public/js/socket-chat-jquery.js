
var params = new URLSearchParams( window.location.search);


var divUsuarios = $('#divUsuarios');
var sendForm = $('#sendForm');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');

var name = params.get('name');
var room = params.get('room');

// Function to renderize contacts.
function renderizeContacts(contacts) {

    var html = '';
    html += '<li>';
    html +=    '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('room') + '</span></a>';
    html += '</li>';





    for (let i = 0; i < contacts.length; i++) {
        
        html += '<li>'
        html += '<a data-id="' + contacts[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ' + contacts[i].name  + ' <small class="text-success">online</small></span></a>';
        html += '</li>'
        
    }

    divUsuarios.html(html);

}


function renderizeMessage(message, me) {

    var html = ''

    var date = new Date(message.date);
    var hour = date.getHours() + ":" + date.getMinutes();

    if(me){
        html += '<li class="animated fadeIn">'
        html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        html += '    <div class="chat-content">'
        html += '        <h5>' + message.name + '</h5>'
        html += '        <div class="box bg-light-info">' + message.message  + '</div>'
        html += '    </div>'
        html += '    <div class="chat-time">' + hour + '</div>'
        html += '</li>';
    } else {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + message.name + '</h5>';
        html += '        <div class="box bg-light-inverse">' + message.message + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    } 
    
    divChatbox.append(html);

}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners
divUsuarios.on('click', 'a', function(){
    var id = $(this).data('id');

    if(id) {
        console.log(id);
    }
    
    
});


sendForm.on('submit', function(e){

    e.preventDefault();

    if(txtMessage.val().trim().length === 0){
        return
    }

    socket.emit('createMessage', {
        name: name,
        message: txtMessage.val()
    }, function(message) {
        txtMessage.val('').focus();
        renderizeMessage(message, true);
        scrollBottom();
    });

});