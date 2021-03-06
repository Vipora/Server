'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(() => {
    Route.post('/auth/login', 'UserController.login')
    Route.post('/auth/register', 'UserController.register')
    Route.post('/auth/logout', 'UserController.logout').middleware(['auth'])
    Route.post('/auth/token/refresh', 'UserController.refresh').middleware(['auth'])

    Route.get('/user', 'UserController.userData').middleware(['auth:api,jwt']);
    Route.get('/user/token', 'UserController.accessToken').middleware(['auth'])
}).prefix('api/v1');


Route.on('/*').render('err')
