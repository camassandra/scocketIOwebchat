# socketIOwebchat

git clone git@github.com:camassandra/socketIOwebchat.git && cd socketIOwebchat && npm install 

run on node app.js, localhost:8080

********************************************************
FEATURES
Multiple users can join a chat room by each entering a unique username on website load. 
Users can type chat messages to the chat room, will be boradcasetd to all other users connected. This is a public chat
and all conversations are shared among all users. 
Open localhost:8080 in multiple tabs or windows to see how messages are broadcasted real-time among users. 
********************************************************
SERVER-SIDE REMARKS
I chose this as my graduation project from a full-stack Javascript course because I explored new challenges both 
on server side and on client side for a node.js web application. 
Socket.io is a web socket that allows real-time exchange of data without request and response and without implementing ajax requests. 
Conversation is stored server-side and cleared periodically. For the demo, this time interval is set to 3 minutes. 
Currently, page is refreshed with a server-side input triggered on clearing chat history. 
I achieved server-side refresh through the use of a module, reload, but this functionality should change. 
********************************************************
CLIENT-SIDE REMARKS
User name must be submitted to start chatting, if a username is submitted overlay div changes to hidden. 
Existing conversation from all users load on the chat box. 
With a little help, I implemented client-side javascript in chatbox to stick to the bottom of the conversation and see always 
the latest messages as they load. 
A cookie stores the nickname of the user for the session (when browser session ends the cookie is deleted). 
This avoids asking again the nickname on page refresh.  
Warning message on show 1min before chat is cleared. Traumatic for some users. 
********************************************************
POINTS FOR IMPROVEMENT
A notification should be sent to all users when a user joins or leaves the chatroom.
Should prevent sending empty messages, and have a focus functionality that clears imput message field when a user writes.
Instead of refreshing chat I shoud send event from server to client js. Better would be if the server periodically (on clear chat) 
emits a warning message that is listened to by client side javascript and renders message to users, 'on reload, chat will be cleared'. 

# than you for taking a look!!#

