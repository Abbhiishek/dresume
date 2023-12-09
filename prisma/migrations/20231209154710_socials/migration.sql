-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" BIGSERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
