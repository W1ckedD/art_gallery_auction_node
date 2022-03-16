-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "display_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "display_img" TEXT NOT NULL,
    "img_1" TEXT,
    "img_2" TEXT,
    "img_3" TEXT,
    "img_4" TEXT,
    "img_5" TEXT,
    "img_6" TEXT,
    "img_7" TEXT,
    "img_8" TEXT,
    "img_9" TEXT,
    "img_10" TEXT,
    "img_11" TEXT,
    "img_12" TEXT,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auction" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "artwork_id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "starting_bid" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "auction_id" INTEGER NOT NULL,
    "placer_id" INTEGER NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_owner_id_key" ON "Artwork"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_title_key" ON "Artwork"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Auction_artwork_id_key" ON "Auction"("artwork_id");

-- CreateIndex
CREATE UNIQUE INDEX "Auction_owner_id_key" ON "Auction"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bid_auction_id_key" ON "Bid"("auction_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bid_placer_id_key" ON "Bid"("placer_id");

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_placer_id_fkey" FOREIGN KEY ("placer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "Auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
