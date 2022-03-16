import { Router } from 'express';
import { requireUser } from '../middlewares/requireUser.js';
import { upload } from '../middlewares/upload.js';

import { ArtWorkController } from '../controllers/artwork.controller.js';

const controller = new ArtWorkController();

const router = Router();

const handleUpload = upload.fields([
  { name: 'display_img' },
  { name: 'img_1' },
]);

router.post('/', requireUser, handleUpload, controller.createArtwork);
router.get('/', controller.getArtworks);

export default router;