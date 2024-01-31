/*
  Warnings:

  - Made the column `userId` on table `Lead` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Lead` DROP FOREIGN KEY `Lead_userId_fkey`;

-- AlterTable
ALTER TABLE `Lead` MODIFY `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,
    `assignedId` INTEGER NULL,
    `leadId` INTEGER NULL,
    `firsName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NULL,
    `officePhone` VARCHAR(191) NULL,
    `mobilePhone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `industry` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_leadId_key`(`leadId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_assignedId_fkey` FOREIGN KEY (`assignedId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `Lead`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
