const Antl = use('Antl');

class Post {
  get validateAll() {
    return true;
  }

  // thumbnail acabou ficado requido
  get rules() {
    return {
      author_id: 'required|exists:users,id',
      title: 'required',
      thumbnail: 'file|file_ext:png,jpg,jpeg|file_size:2mb|file_types:image',
      content: 'required',
      active: 'boolean|required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Post;
