/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `JournalEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JournalEntry_userId_date_key" ON "JournalEntry"("userId", "date");
