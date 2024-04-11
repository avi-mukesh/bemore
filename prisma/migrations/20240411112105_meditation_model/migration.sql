-- CreateTable
CREATE TABLE "Meditation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Meditation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meditation" ADD CONSTRAINT "Meditation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
