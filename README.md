# app
app server for hearthstone.gg

##amplify events

`` ready `` Config file has been loaded from the server
`` app:user `` The user was successfully logged in
`` socket:connect `` The socket server was connected to
`` socket:disconnect `` The socket disconected
`` socket:ping `` The socket pinged

##emits socket events
`` subscribe `` Sends a request to hoins a socket.io room for the given token

##test events
```javascript
	amplify.publish('app:user', { displayName: 'sup', token: '123' });
```