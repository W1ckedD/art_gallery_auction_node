import client from '@prisma/client';
import { deleteImageFile } from '../middlewares/prismaDeleteImageFile.js';

const prisma = new client.PrismaClient();

prisma.$use(deleteImageFile);

export class ArtWorkController {
  async getArtworks(req, res) {
    const { user_id } = req.query;
    try {
      let where = {};
      if (user_id) {
        where.owner_id = parseInt(user_id);
      }
      const artworks = await prisma.artwork.findMany({
        where,
        include: {
          owner: true,
          images: true,
        },
      });
      return res.status(200).json({ artworks });
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  async getArtwork(req, res) {
    const { id } = req.params;
    try {
      const artwork = await prisma.artwork.findUnique({
        where: { id: parseInt(id) },
        include: { images: true, owner: true, auctions: true, _count: true },
      });
      return res.status(200).json({ artwork });
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  async getUserArtworks(req, res) {
    try {
      const artworks = await prisma.artwork.findMany({
        where: {
          owner_id: req.user.id,
        },
        include: {
          images: true,
          auctions: true,
        },
      });
      return res.status(200).json({ artworks });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  async createArtwork(req, res) {
    const { title, description } = req.body;
    const files = req.files;
    try {
      const images = [];

      for (const key in files) {
        const url = '/' + files[key][0].path.replace(/\\/g, '/');
        const image = {
          name: files[key][0].fieldname,
          path: files[key][0].path,
          url,
        };
        images.push(image);
      }

      const artwork = await prisma.artwork.create({
        data: {
          title,
          description,
          owner: {
            connect: { id: req.user.id },
          },
          images: {
            createMany: { data: images },
          },
        },
      });
      return res.status(201).json({ artwork });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  async updateArtwork(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const files = req.files;
    try {
      const images = [];

      for (const key in files) {
        const url = '/' + files[key][0].path.replace(/\\/g, '/');
        const image = {
          name: files[key][0].fieldname,
          path: files[key][0].path,
          url,
        };
        images.push(image);
      }

      const artwork = await prisma.artwork.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          owner: {
            connect: { id: req.user.id },
          },
        },
      });

      return res.status(200).json({ artwork });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  async deleteArtwork(req, res) {
    const { id } = req.params;
    try {
      const artwork = await prisma.artwork.delete({
        where: { id: parseInt(id) },
      });
      return res.status(200).json({ artwork });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).json({ error: err.message });
    }
  }
}
