'use strict'

const Ws = use('Ws')

class BridgeController {
  constructor ({ socket, request, auth }) {
    this.socket = socket;
    this.request = request;
    this.auth = auth;
    console.log(socket.id + " joined");
  }

  onMessage(message){
    switch(message.event){
      case 'test':
        Ws.getChannel("frontend:*")
          .topic("frontend:" + this.auth.user.username)
          .broadcast("event", message);

    }
    console.log(message);
  }
}

module.exports = BridgeController
