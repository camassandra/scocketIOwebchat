// window.onload = function() {

//     var messages = [];
//     var socket = io.connect('http://localhost:3700');
//     var field = document.getElementById("field");
//     var sendButton = document.getElementById("send");
//     var content = document.getElementById("content");
//     var name = document.getElementById("name");

//     socket.on('message', function (data) {
//         if(data.message) {
//             messages.push(data);
//             var html = '';
//             for(var i=0; i<messages.length; i++) {
//                 html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
//                 html += messages[i].message + '<br />';
//             }
//             content.innerHTML = html;
//         } else {
//             console.log("There is a problem:", data);
//         }
//     });

//     sendButton.onclick = sendMessage = function() {
//         if(name.value == "") {
//             alert("Please type your name!");
//         } else {
//             var text = field.value;
//             socket.emit('send', { message: text, username: name.value });
//             field.value = "";
//         }
//     };

// }
// $(document).ready(function() {
//     $("#field").keyup(function(e) {
//         if(e.keyCode == 13) {
//             sendMessage();
//         }
//     });
// });


var socket = io.connect('http://localhost:8080');
        //on submit, takes the message 
    $(document).ready(function() {  
        $('#chatbox').submit(function(e){
            e.preventDefault();
            console.log('this is event ');
            console.log(e);
            var message= $('#usermsg').val();
            //this emits message event on server
            socket.emit('messages', message);
            console.log('message')
            console.log(message)
            //
        });
        socket.on('messages', function(allthatjazz){
        	console.log(allthatjazz);
        	insertMessage(allthatjazz)
        });
        socket.on('message', function(input){
			console.log('the server sends a message');
			 insertMessage(input);
        });

        socket.on('status', function(data){
            $('#alert').html(data.message);
            
        });
        
        socket.on('connect', function(data){
            $('#status').html('You are connected to the chat!');
            //prompts user to fill in nickname and stores it
            nickname = prompt('what is your nickname?'); 
            //notify server on user's nickname
            socket.emit('join', nickname);
            $('.nickname').html(nickname);
	        });
		});

        function insertMessage(data){
            console.log('data')
            console.log(data)
            // var newMessage = document.createElement('li');
            // newMessage.innerHTML = data;
            // var allMessages = document.getElementByTagName('ul')[0];
            $('#chatConversation').append($('<li>').text(data));
            //return allMessages.appendChild(newMessage);
            
        }
