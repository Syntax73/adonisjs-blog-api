/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostTagSchema extends Schema {
  up() {
    this.create('post_tag', table => {
      table.increments();
      table
        .integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table
        .integer('tag_id')
        .unsigned()
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('post_tag');
  }
}

module.exports = PostTagSchema;
