/*
  Warnings:

  - You are about to drop the column `waktu` on the `settings` table. All the data in the column will be lost.
  - Added the required column `aktif_pengumuman` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat_sekolah` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_sekolah` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `izin_login` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo_sekolah` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_kepsek` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_sekolah` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip_kepsek` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `npsn` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktu_pengumuman` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `settings` DROP COLUMN `waktu`,
    ADD COLUMN `aktif_pengumuman` INTEGER NOT NULL,
    ADD COLUMN `alamat_sekolah` VARCHAR(191) NOT NULL,
    ADD COLUMN `email_sekolah` VARCHAR(191) NOT NULL,
    ADD COLUMN `izin_login` INTEGER NOT NULL,
    ADD COLUMN `logo_sekolah` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_kepsek` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_sekolah` VARCHAR(191) NOT NULL,
    ADD COLUMN `nip_kepsek` VARCHAR(191) NOT NULL,
    ADD COLUMN `npsn` INTEGER NOT NULL,
    ADD COLUMN `semester` VARCHAR(191) NOT NULL,
    ADD COLUMN `waktu_pengumuman` VARCHAR(191) NOT NULL;
