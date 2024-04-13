-- CreateTable
CREATE TABLE "MoodEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moodId" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoodEntry" ADD CONSTRAINT "MoodEntry_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
