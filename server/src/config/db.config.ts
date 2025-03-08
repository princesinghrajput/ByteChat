import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:["error","info"],
});

export default prisma;
