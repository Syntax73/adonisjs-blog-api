/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('/sessions', 'SessionController.store').validator('Session');

Route.get('/files/:file', 'FileController.show');

Route.get('/posts', 'PostController.index');
Route.get('/posts/:id', 'PostController.show');

Route.group(() => {
  Route.post('/posts', 'PostController.store').validator('Post');
  Route.put('/posts/:id', 'PostController.update').validator('Post');
  Route.delete('/posts/:id', 'PostController.destroy');

  Route.post('/tags', 'TagController.store').validator('Tag');
  Route.get('/tags', 'TagController.index');
  Route.get('/tags/:id', 'TagController.show');
  Route.put('/tags/:id', 'TagController.update').validator('Tag');
  Route.delete('/tags/:id', 'TagController.destroy');
}).middleware('auth');
