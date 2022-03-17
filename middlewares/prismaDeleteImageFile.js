import client from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new client.PrismaClient();
const fsPromises = fs.promises;

export const deleteImageFile = async (params, next) => {
  if (params.model === 'Artwork' && params.action === 'delete') {
    const images = await prisma.image.findMany({
      where: { artwork_id: params.args.where.id },
    });
    if (images.length > 0) {
      await Promise.all(
        images.map(
          async (img) =>
            await fsPromises.unlink(path.join(path.dirname(''), img.path))
        )
      );
    }
    return await next(params);
  }
  return await next(params);
};
