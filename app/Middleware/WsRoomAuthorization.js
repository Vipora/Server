'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const GE = require('@adonisjs/generic-exceptions')

class WsRoomAuthorization {

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle ({ socket, request, auth }, next) {
    if(socket.topic.split(":")[1] === auth.user.email)
      // call next to advance the request
      await next()
    else{
      throw new GE.LogicalException("You don't have access to that room");
    }
  }
}

module.exports = WsRoomAuthorization
