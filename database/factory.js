/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Post', (faker, i, data) => {
  return {
    title: faker.sentence({ words: 7 }),
    content: faker.paragraph(),
    active: faker.bool(),
    ...data,
  };
});

Factory.blueprint('App/Models/Tag', (faker, i, data) => {
  return {
    title: faker.word(),
    ...data,
  };
});
