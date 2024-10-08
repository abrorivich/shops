-- CreateTable
CREATE TABLE "shops" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branches" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shopID" INTEGER NOT NULL,

    CONSTRAINT "branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employe" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "from" TEXT NOT NULL,

    CONSTRAINT "employe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "branchEmploye" (
    "id" SERIAL NOT NULL,
    "branchId" INTEGER NOT NULL,
    "employeId" INTEGER NOT NULL,

    CONSTRAINT "branchEmploye_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_branchesToemploye" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "shops_name_key" ON "shops"("name");

-- CreateIndex
CREATE UNIQUE INDEX "branches_name_key" ON "branches"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_branchesToemploye_AB_unique" ON "_branchesToemploye"("A", "B");

-- CreateIndex
CREATE INDEX "_branchesToemploye_B_index" ON "_branchesToemploye"("B");

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_shopID_fkey" FOREIGN KEY ("shopID") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branchEmploye" ADD CONSTRAINT "branchEmploye_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branchEmploye" ADD CONSTRAINT "branchEmploye_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "employe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_branchesToemploye" ADD CONSTRAINT "_branchesToemploye_A_fkey" FOREIGN KEY ("A") REFERENCES "branches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_branchesToemploye" ADD CONSTRAINT "_branchesToemploye_B_fkey" FOREIGN KEY ("B") REFERENCES "employe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
