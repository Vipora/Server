'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Encryption = use('Encryption');

class EncryptToken {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    if(request.request.headers['authorization']){
      let data = request.request.headers['authorization'].split(" ");
      if(data[1] && data[1].length == 32){
        request.request.headers['authorization'] = data[0] + " " + Encryption.encrypt(data[1]);
      }
    }
    // call next to advance the request
    await next()
  }

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle ({ request }, next) {
    if(request.request.headers['authorization']){
      let data = request.request.headers['authorization'].split(" ");
      if(data[1] && data[1].length == 32){
        request.request.headers['authorization'] = data[0] + " " + Encryption.encrypt(data[1]);
      }
    }
    // call next to advance the request
    await next()
  }
}

module.exports = EncryptToken
