class GeneralCtrl {
  async getVersion(req, res) {
    try {

      res.status(200).send({ version: '1.0.0' });
    } catch (err) {
      console.error(err);
      res.status(400).send(err || { message: 'Failed to get version' });
    }
  }

}

export const generalCtrl = new GeneralCtrl();
