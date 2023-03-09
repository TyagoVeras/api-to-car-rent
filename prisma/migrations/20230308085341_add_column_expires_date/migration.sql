/*
  Warnings:

  - Added the required column `expires_date` to the `users_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_token" ADD COLUMN     "expires_date" TIMESTAMP(3) NOT NULL;
