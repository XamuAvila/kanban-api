import { PrismaClient } from "@prisma/client";
import { AuthMiddleware } from "../api/setup/middlewares/auth.middleware";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
async function main() {
    const ada = await prisma.usuario.upsert({
        where: {
            login: String(process.env.DB_USER)
        },
        update: {},
        create: {
            login: String(process.env.DB_USER),
            senha: await AuthMiddleware.hashPassword("lets@123"),
            email: String(process.env.DB_PASSWORD)
        }
    });
    console.log("created: ", ada);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
