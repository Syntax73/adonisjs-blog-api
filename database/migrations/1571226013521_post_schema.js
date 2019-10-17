/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostSchema extends Schema {
  up() {
    this.create('posts', table => {
      table.increments();
      table
        .integer('author_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.string('thumbnail');
      table
        .boolean('active')
        .defaultTo(false)
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }
}

module.exports = PostSchema;
