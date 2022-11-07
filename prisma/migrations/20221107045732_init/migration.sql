/*
  Warnings:

  - You are about to drop the column `created_at` on the `tb_expense` table. All the data in the column will be lost.
  - You are about to drop the column `debit` on the `tb_expense` table. All the data in the column will be lost.
  - You are about to drop the column `kredit` on the `tb_expense` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `tb_expense` table. All the data in the column will be lost.
  - You are about to alter the column `balance` on the `tb_user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - A unique constraint covering the columns `[id]` on the table `tb_expense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `tb_expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_expense` DROP COLUMN `created_at`,
    DROP COLUMN `debit`,
    DROP COLUMN `kredit`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expense` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_user` MODIFY `balance` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `tb_income` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `income` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_income_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tb_expense_id_key` ON `tb_expense`(`id`);

-- AddForeignKey
ALTER TABLE `tb_income` ADD CONSTRAINT `tb_income_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
