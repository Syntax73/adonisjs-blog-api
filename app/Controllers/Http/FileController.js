const Helpers = use('Helpers');

class FileController {
  // Esta funcao retorna a thumbnail
  async show({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.file}`));
  }
}

module.exports = FileController;
