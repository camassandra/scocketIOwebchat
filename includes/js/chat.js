var nickname;

var socket = io.connect('http://localhost:8080');
        //on submit, takes the message 
    $(document).ready(function() {  
        $('#chatbox').submit(function(e){
            e.preventDefault();
            console.log('this is event ');
            console.log(e);
            var message= $('#usermsg').val();
            $('#usermsg').val('');
            //this emits message event on server
            socket.emit('messages', message);

        });

        socket.on('messages', function(msg){
            insertMessage(msg)
        });

        socket.on('message', function(input){
        console.log('server broadcasts a message');
                    console.log(input);
                insertMessage(input);

        });

        socket.on('chatHistory', function(input){
            console.log('this is history');
            console.log(input);
        $('#chatList').html(input);
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
            if (document.cookie){
                var cookieNickname =(document.cookie).split("=")[1];
                nickname = cookieNickname;
                
                $('#overlay').css('display','none');
                $('body').css('overflow','visible');
                $('.nickname').text(nickname);
            }
            else{
            function checkNickname(){
                if($('#inputNickname').val()){
                nickname = $('#inputNickname').val();
                
                
                $('#overlay').css('display','none');
                $('body').css('overflow','visible');
                $('.nickname').text(nickname);
                createUserCookie();

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
            }
            socket.emit('join', nickname);
	       });
		}); 

        function warnReset(){
                $('#warningReset').text('Chat will be reset every 3 minutes. Sorry for the inconvenience :-)' );
                $('#warningReset').css('visibility','visible');

            console.log('reset warning triggered');
            };
        
        setInterval(warnReset, 60000);
    
        /*
        
        function refresh() {
         if(window.location.reload(true)){
            d = new Date().getTime()
            
         }
     
        */

        function insertMessage(data){
            $('#chatList').append($('<li>').text(data));
            var height = 0;
            function scroll(height, ele) {
                this.stop().animate({ scrollTop: height }, 1000);
            };
            var targetDiv = $('#chatConversation');
                height = targetDiv[0].scrollHeight;
                scroll.call(targetDiv, height, this);
            }

        function createUserCookie(){
            var userCook = document.cookie = 'nickname ='+ nickname
            console.log(document.cookie);

        }

