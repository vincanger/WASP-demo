/*
  Warnings:

  - You are about to drop the column `signedUp` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "signedUp",
ADD COLUMN     "isAuthComplete" BOOLEAN NOT NULL DEFAULT false;
