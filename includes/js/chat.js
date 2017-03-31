// window.onload = function() {

//     
//     var socket = io.connect('http://localhost:3700');
//     var field = document.getElementById("field");
//     var sendButton = document.getElementById("send");
//     var content = document.getElementById("content");
//     var name = document.getElementById("name");



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
var nickname;

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

        });

        socket.on('messages', function(jazz){
            console.log('this is jazz')
        	console.log(jazz);
            insertMessage(jazz)
        });

        socket.on('message', function(input){
        console.log('server broadcasts a message');
                    console.log(input);
                insertMessage(input);

        });

        socket.on('chatHistory', function(input){
            console.log('this is history');
            console.log(input);
        $('#chatConversation').html(input);
			      });

        socket.on('status', function(data){
            $('#alert').html(data.message);
            
        });
        
        /*function askNickname(){
            nickname = prompt('what is your nickname?'); 
            console.log('nickname asked', nickname)
            if (!nickname || nickname == null) {
                askNickname();
            } 
        }*/

        socket.on('connect', function(data){
            function checkNickname(){
                if($('#inputNickname').val()){
                nickname = $('#inputNickname').val();
                socket.emit('join', nickname);
                $('#overlay').css('display','none');
                $('.nickname').text(nickname);

                }
            else {
                $('.errorField').css('visibility', 'visible');
                $('.errorField').text('Please fill in a nickame');
            }
            }           
            $('#status').html('You are connected to the chat!');
            //prompts user to fill in nickname and stores it
            //askNickname();
            $('#inputNickname').bind('keypress', function(e) {
                console.log(e, e.keyCode);
                var code = e.keyCode || e.which;
                if(code == 13) { 
                    checkNickname();
                 }
            });
            $('#submitname').click(function(){
                checkNickname();
            })

	        });
		}); 

        function warnReset(){
            $('#warningReset').text('Chat will be reset in 2 minutes. Sorry for the inconvenience :-)' );
            };

        var d = new Date()
        
        setInterval(warnReset(), d + 60000);
        /*
        
        function refresh() {
         if(window.location.reload(true)){
            d = new Date().getTime()
            
         }
     
        */


        function insertMessage(data){
            // var newMessage = document.createElement('li');
            // newMessage.innerHTML = data;
            // var allMessages = document.getElementByTagName('ul')[0];
            $('#chatConversation').append($('<li>').text(data));
            //return allMessages.appendChild(newMessage);
        }
