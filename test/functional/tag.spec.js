const { test, trait } = use('Test/Suite')('Tags');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tag = use('App/Models/Tag');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create tag', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/tags')
    .loginVia(user, 'jwt')
    .send({
      title: 'NodeJs',
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});

test('it should be able to list tag', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const tag = await Factory.model('App/Models/Tag').create();

  const response = await client
    .get('/tags')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body[0].title, tag.title);
});

test('it should be able to show single tag', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const tag = await Factory.model('App/Models/Tag').create();

  const response = await client
    .get(`/tags/${tag.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, tag.title);
});

test('it should be able to update tag', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const tag = await Factory.model('App/Models/Tag').create();

  const response = await client
    .put(`/tags/${tag.id}`)
    .send({ title: 'New Title' })
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, 'New Title');
});

test('it should be able to delete tag', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const tag = await Factory.model('App/Models/Tag').create();

  const response = await client
    .delete(`/tags/${tag.id}`)
    .loginVia(user, 'jwt')
    .end();

  const checkTag = await Tag.find(tag.id);

  response.assertStatus(204);
  assert.isNull(checkTag);
});
