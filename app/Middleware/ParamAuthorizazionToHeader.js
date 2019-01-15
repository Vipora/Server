'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ParamAuthorizazionToHeader {

  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async wsHandle ({ request }, next) {
    if(request._all['authorization']){
      request.request.headers['authorization'] = "Bearer " + request._all["authorization"];
    }
    // call next to advance the request
    await next()
  }
}

module.exports = ParamAuthorizazionToHeader
