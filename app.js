var express = require ('express');
const app = express();
const http = require("http");
//create a http server
const server = http.createServer(app);
const io = require('socket.io')(server);



// port setting
//app.listen(port); changes to 

var port = 8080


//here comes the middleware stuff!

app.use(express.static(__dirname+'/includes'));
//bodyparser here
//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}))

//set content in views && engine view as html

app.set('views', __dirname+'/views');

//testing index view
app.get("/", function(req, res){
    res.sendFile(__dirname+'/views/index.html');
});



//socket  io connection handler 
io.on('connection', function (client) {
	console.log('Hello! a user is connected');
		//emit  event message on client side(CHROME)
    client.emit('status', { message: 'Server is listening! You may start chatting' });
    client.on('send', function (data) {
        client.emit('message', data);
    });
    //sets how the nickname is joined with each client
	client.on('join', function(name){
		client.nickname = name;
		console.log(name);
	});//listen on message events
	client.on('messages', function(data){
		console.log('a message is sent by the client');
		var username = client.nickname;
		console.log(username + ' ' + data);
		//stores nickname in var before broadcasting message
		
		//broadcast message and nickname to all other clients connected
		client.broadcast.emit('message', username + ' : ' + data);
		//send concatenated message and username back to client 
		client.emit('messages', username + ' : ' + data);
		});
	});

//setInterval(()=>io.emit('count', count++), 2000);

server.listen(port);
console.log("Listening on port " + port);

