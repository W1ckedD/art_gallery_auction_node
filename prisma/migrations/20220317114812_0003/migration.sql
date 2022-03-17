/*
  Warnings:

  - You are about to drop the column `display_img` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_1` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_10` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_11` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_12` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_2` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_3` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_4` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_5` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_6` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_7` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_8` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `img_9` on the `Artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Artwork" DROP COLUMN "display_img",
DROP COLUMN "img_1",
DROP COLUMN "img_10",
DROP COLUMN "img_11",
DROP COLUMN "img_12",
DROP COLUMN "img_2",
DROP COLUMN "img_3",
DROP COLUMN "img_4",
DROP COLUMN "img_5",
DROP COLUMN "img_6",
DROP COLUMN "img_7",
DROP COLUMN "img_8",
DROP COLUMN "img_9";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "artwork_id" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_artwork_id_key" ON "Image"("artwork_id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
