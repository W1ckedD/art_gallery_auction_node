-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_artwork_id_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
