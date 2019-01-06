'use strict'

const { validate } = use('Validator')

class UserController {
  login({ request, response }) {
    return response.send({status: 'ok'})
  }

  async register({ request, response }) {
    const validation = await validate(request.all(), {
      email: 'required|email|unique:users,email',
      password: 'required|min:6'
    })

    if (validation.fails()) {
      return response
        .status(400)
        .send(validation.messages())
    }

    return {status: 'ok'}
  }
}

module.exports = UserController
