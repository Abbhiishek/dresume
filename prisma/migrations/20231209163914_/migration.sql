/*
  Warnings:

  - You are about to drop the `SocialMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "githubid" TEXT DEFAULT '',
ADD COLUMN     "linkedinid" TEXT DEFAULT '',
ADD COLUMN     "tagline" TEXT NOT NULL DEFAULT 'Hey 🙌! using DResume.in',
ADD COLUMN     "twitterid" TEXT DEFAULT '',
ADD COLUMN     "websiteurl" TEXT DEFAULT '';

-- DropTable
DROP TABLE "SocialMedia";
