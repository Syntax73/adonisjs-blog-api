const { test, trait } = use('Test/Suite')('Post');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @typedef {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create posts', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/posts')
    .loginVia(user, 'jwt')
    .field('author_id', user.id)
    .field('title', 'Aprendento AdonisJs')
    .field(
      'content',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris commodo bibendum ultrices. Aliquam laoreet, urna vitae luctus blandit, leo orci cursus dolor, at gravida lacus risus vitae diam.'
    )
    .field('active', false)
    .attach('thumbnail', Helpers.tmpPath('test/thumb.jpg'))
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});

test('it should be able to list posts', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const post = await Factory.model('App/Models/Post').make();

  await user.posts().save(post);

  const response = await client.get('/posts').end();

  response.assertStatus(200);

  assert.equal(response.body[0].title, post.title);
  assert.equal(response.body[0].user.id, post.author_id);
});

test('it should be able to show single posts', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const post = await Factory.model('App/Models/Post').make();

  await user.posts().save(post);

  const response = await client.get(`/posts/${post.id}`).end();

  response.assertStatus(200);

  assert.equal(response.body.title, post.title);
  assert.equal(response.body.user.id, post.author_id);
});

test('it should be able to update post', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const post = await Factory.model('App/Models/Post').make();

  await user.posts().save(post);

  const response = await client
    .put(`/posts/${post.id}`)
    .loginVia(user, 'jwt')
    .field('author_id', user.id)
    .field('title', 'Atualizado')
    .field('content', 'Apenas um teste')
    .field('active', false)
    .attach('thumbnail', Helpers.tmpPath('test/thumb.jpg'))
    .end();

  response.assertStatus(200);

  assert.equal(response.body.title, 'Atualizado');
  assert.exists(response.body.thumbnail);
});

test('it should be able to delete post', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const post = await Factory.model('App/Models/Post').make();

  await user.posts().save(post);

  const response = await client
    .delete(`/posts/${post.id}`)
    .loginVia(user, 'jwt')
    .end();

  const checkPost = await Post.find(post.id);

  response.assertStatus(204);
  assert.isNull(checkPost);
});
