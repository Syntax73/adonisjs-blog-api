/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const Env = use('Env');

class Post extends Model {
  static get computed() {
    return ['thumbnail_url'];
  }

  user() {
    return this.belongsTo('App/Models/User', 'author_id');
  }

  tags() {
    return this.belongsToMany('App/Models/Tag');
  }

  getThumbnailUrl({ thumbnail }) {
    return `${Env.get('APP_URL')}/files/${thumbnail}`;
  }
}

module.exports = Post;
