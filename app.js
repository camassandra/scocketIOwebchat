var express = require ('express');
const app = express();
const http = require("http");
//create a http server
const server = http.createServer(app);
//now server and socket are sharing same http request
const io = require('socket.io')(server);
const reload = require('reload');
reloadServer= reload(server, app);

//chat history arrays
let messages = [];
let users = []

function resetChat(){
	messages = [];
	users =[];
	console.log('messages cleared')
	console.log(users);
	reloadServer.reload();
};
setInterval(resetChat, 30000);
//every 3 min and reloads page
//resets chat every hour with 3600000ms 

// port setting
var port = 8080

//here comes the middleware stuff!

app.use(express.static(__dirname+'/includes'));


//set content in views 

app.set('views', __dirname+'/views');

//testing index view
app.get("/", function(req, res){
    res.sendFile(__dirname+'/views/index.html');
});

app.get('/tooBad', function(req, res){
	res.sendFile(__dirname+'/views/exit.html');
});

//socket  io connection handler 
io.on('connection', function (client) {
	console.log('Hello! a user is connected');
		//emit  event message on client side(CHROME)
	if (users.length > 0 ){
	            console.log('users and messages')
	            console.log(users, ';', messages)
	             var html = '';
            for (var i = 0; i < messages.length; i++) {
                     html += '<li>' + users[i] + ': ';
                     html +=  messages[i] + '<br />';
                     }
	            client.emit('chatHistory', html);
	            }
			else {
				console.log('no chat history: ');
				};
    	
    client.emit('status', { message: 'Server is listening! You may start chatting' });
    

    //sets how the nickname is joined with each client
	client.on('join', function(name){
		client.nickname = name;
		console.log(name);
	});

	//listen on message events
	client.on('messages', function(data){
	console.log('a message is sent by the client \n and being broadcasted');
		//stores nickname in var before broadcasting message
	var username = client.nickname;
	messages.push(data);
    users.push(username);
    //broadcast message and nickname to all other clients connected
	client.broadcast.emit('message', username + ' : '+ data);
	//send concatenated message and username back to client 
	client.emit('messages', username + ' : '+ data);
	});
//closing the whole socket.io connection 	
});

//setInterval(()=>io.emit('count', count++), 2000);

server.listen(port);
console.log("Listening on port " + port);

