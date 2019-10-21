const Antl = use('Antl');

class Tag {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Tag;
