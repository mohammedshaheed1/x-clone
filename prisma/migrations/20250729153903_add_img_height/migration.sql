-- AlterTable
ALTER TABLE `Post` ADD COLUMN `imgHeight` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` ALTER COLUMN `updatedAt` DROP DEFAULT;
