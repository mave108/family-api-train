-- AlterTable
ALTER TABLE `User` ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    MODIFY `first_name` VARCHAR(28) NULL,
    MODIFY `last_name` VARCHAR(28) NULL,
    MODIFY `nick_name` VARCHAR(12) NULL;

-- CreateTable
CREATE TABLE `Members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner_id` INTEGER NOT NULL,
    `member_id` INTEGER NOT NULL,

    UNIQUE INDEX `Members_member_id_key`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Members` ADD CONSTRAINT `Members_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
