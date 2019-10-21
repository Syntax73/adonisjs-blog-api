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
      .with('tags', builder => {
        builder.select(['id', 'title']);
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
    const { tags, ...data } = request.only([
      'author_id',
      'title',
      'content',
      'active',
      'tags',
    ]);

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

    if (tags && tags.length > 0) {
      await post.tags().attach(tags);
      await post.load('tags');
    }

    return response.status(201).json(post);
  }

  async update({ request, params }) {
    const post = await Post.find(params.id);
    const { tags, ...data } = request.only([
      'author_id',
      'title',
      'content',
      'active',
      'tags',
    ]);

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

    if (tags && tags.length > 0) {
      await post.tags().sync(tags);
      await post.load('tags');
    }

    return post;
  }

  async destroy({ params }) {
    const post = await Post.find(params.id);

    await post.delete();
  }
}

module.exports = PostController;
