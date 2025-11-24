/*
  Warnings:

  - Added the required column `apellido` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edad` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Tareas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    CONSTRAINT "Tareas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Usuarios" ("id") SELECT "id" FROM "Usuarios";
DROP TABLE "Usuarios";
ALTER TABLE "new_Usuarios" RENAME TO "Usuarios";
CREATE UNIQUE INDEX "Usuarios_username_key" ON "Usuarios"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
