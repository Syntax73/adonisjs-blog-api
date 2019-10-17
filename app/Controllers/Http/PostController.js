/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post');

const Helpers = use('Helpers');

class PostController {
  // Mostar lista de posts
  async index() {
    const posts = await Post.query()
      .with('user', builder => {
        builder.select(['id', 'name', 'email']);
      })
      .fetch();
    return posts;
  }

  // Mosta unico post
  async show({ params }) {
    const post = await Post.find(params.id);

    await post.load('user', builder => {
      builder.select(['id', 'name', 'email']);
    });

    return post;
  }

  // Cria post
  async store({ request, response }) {
    const data = request.only(['author_id', 'title', 'content', 'active']);

    const thumbnail = request.file('thumbnail');

    if (thumbnail) {
      await thumbnail.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${thumbnail.subtype}`,
      });

      if (!thumbnail.moved()) {
        return thumbnail.error();
      }

      data.thumbnail = thumbnail.fileName;
    }

    const post = await Post.create(data);

    return response.status(201).json(post);
  }

  async update({ request, params }) {
    const post = await Post.find(params.id);
    const data = request.only(['author_id', 'title', 'content', 'active']);

    const thumbnail = request.file('thumbnail');

    if (thumbnail) {
      await thumbnail.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${thumbnail.subtype}`,
      });

      if (!thumbnail.moved()) {
        return thumbnail.error();
      }

      post.thumbnail = thumbnail.fileName;
    }

    post.merge(data);

    await post.save();

    return post;
  }

  async destroy({ params }) {
    const post = await Post.find(params.id);

    await post.delete();
  }
}

module.exports = PostController;
