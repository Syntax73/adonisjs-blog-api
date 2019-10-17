/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class UserSeeder {
  async run() {
    await Factory.model('App/Models/User').create({
      email: 'admin@adm.com',
      password: 'qwe123',
    });
  }
}

module.exports = UserSeeder;
