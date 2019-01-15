'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('chat', ({ socket, auth }) => {
  console.log('auth');
  console.log('user joined with %s socket id', socket.id)
});

Ws.channel('bridge:*', 'BridgeController').middleware(['auth:api', 'userRooms']);
Ws.channel('frontend:*', ({ socket }) => {
  console.log("frontend %s joined", socket.id)
}).middleware(["auth:jwt", "userRooms"]);