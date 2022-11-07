-- CreateTable
CREATE TABLE `tb_tracker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `balance` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_tracker_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_tracker` ADD CONSTRAINT `tb_tracker_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tb_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
