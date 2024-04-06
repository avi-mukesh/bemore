-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(511) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
