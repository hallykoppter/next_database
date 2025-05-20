/*
  Warnings:

  - Added the required column `kelas` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keterangan` to the `Siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `siswa` ADD COLUMN `kelas` VARCHAR(191) NOT NULL,
    ADD COLUMN `keterangan` INTEGER NOT NULL;
