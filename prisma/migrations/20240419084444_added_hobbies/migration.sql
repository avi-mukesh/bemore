-- CreateTable
CREATE TABLE "Hobby" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(127) NOT NULL,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HobbyEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hobbyId" TEXT NOT NULL,

    CONSTRAINT "HobbyEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HobbyEntry" ADD CONSTRAINT "HobbyEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbyEntry" ADD CONSTRAINT "HobbyEntry_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "Hobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
