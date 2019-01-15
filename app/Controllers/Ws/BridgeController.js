'use strict'

class BridgeController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = BridgeController
