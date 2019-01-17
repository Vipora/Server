'use strict'

const Ws = use('Ws')

class BridgeController {
  constructor ({ socket, request, auth }) {
    this.socket = socket;
    this.request = request;
    this.auth = auth;
    console.log(socket.id + " joined");
  }

  //This method gets called if the bridge sent an event
  onBridge(message){
    console.log(message);
    switch(message.event){
      case 'test':
        this.socket.broadcast('client', message);
        break;
    }
  }
}

module.exports = BridgeController
