# app
app server for hearthstone.gg

##amplify events

`` ready `` Config file has been loaded from the server

`` app:user `` The user was successfully logged in

`` socket:connect `` The socket server was connected to

`` socket:disconnect `` The socket disconected

`` socket:ping `` The socket pinged

##emits socket events
`` subscribe `` Sends a request to join a socket.io room for the given token

##test events
```javascript
	amplify.publish('app:user', { displayName: 'sup', token: '123' });

	amplify.publish('app:game-start', [{"name":"The Innkeeper","teamId":2,"team":"OPPOSING"},{"name":"Tidwell","teamId":1,"team":"FRIENDLY"}]);

	amplify.publish('app:friendly-hero', {"cardName":"Rexxar","cardId":4,"team":"FRIENDLY","zone":"PLAY (Hero)"});

	amplify.publish('app:opposing-hero', {"cardName":"Valeera Sanguinar","cardId":36,"team":"OPPOSING","zone":"PLAY (Hero)"});

	amplify.publish('app:game-over', [{"name":"The Innkeeper","teamId":2,"team":"OPPOSING","status":"WON"},{"name":"Tidwell","teamId":1,"team":"FRIENDLY","status":"LOST"}]);
```