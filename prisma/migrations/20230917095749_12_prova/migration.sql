-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "base";

-- CreateTable
CREATE TABLE "auth"."users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "nome" TEXT,
    "cognome" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."bookmarks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "titolo" TEXT NOT NULL,
    "descrizione" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "auth"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_link_key" ON "base"."bookmarks"("link");

-- AddForeignKey
ALTER TABLE "base"."bookmarks" ADD CONSTRAINT "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
