/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Tag = use('App/Models/Tag');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class TagController {
  async index() {
    const tags = Tag.all();

    return tags;
  }

  async show({ params }) {
    const tag = await Tag.find(params.id);

    return tag;
  }

  async store({ request, response }) {
    const data = request.only(['title']);

    const tag = await Tag.create(data);

    response.status(201).json(tag);
  }

  async update({ request, params }) {
    const tag = await Tag.find(params.id);
    const data = request.only(['title']);

    tag.merge(data);

    await tag.save();

    return tag;
  }

  async destroy({ params }) {
    const tag = await Tag.find(params.id);

    await tag.delete();
  }
}

module.exports = TagController;
