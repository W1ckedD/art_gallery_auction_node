import client from '@prisma/client';

const prisma = new client.PrismaClient();

export class ArtWorkController {
  async getArtworks(req, res) {
    try {
      const artworks = await prisma.artwork.findMany();
      return res.status(200).json({ artworks });
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  async getArtwork(req, res) {
    const { id } = req.params;
    try {
      const artwork = await prisma.artwork.findUnique({ where: { id } });
      return res.status(200).json({ artwork });
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  async createArtwork(req, res) {
    const { title, description } = req.body;
    const files = req.files;
    try {
      const newArtwork = { title, description, owner: { connect: { id: req.user.id } } };
      for (const key in files) {
        const url = '/' + files[key][0].path.replace(/\\/g, '/');
        const field_name = files[key][0].fieldname;
        newArtwork[field_name] = url;
      }
      const artwork = await prisma.artwork.create({ data: newArtwork });
      return res.status(201).json({ artwork });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
}
