import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { PrismaClient } from "@prisma/client";
import { BaseError } from "../../errors/baseError";
import { HTTP_STATUSES } from "../../constants/httpStatuses.constants";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

@Service()
export class UserService {
    private prismaClient!: PrismaClient;
    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async createUser(user: Prisma.UsuarioCreateInput) {
        try {
            await this.prismaClient.$connect();
            const createdUser = await this.prismaClient.usuario.create({
                data: {
                    ...user,
                    senha: await AuthMiddleware.hashPassword(user.senha)
                }
            });
            return createdUser;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new BaseError("Error while creating user", HTTP_STATUSES.INTERNAL_SERVER_ERROR);
        }
    }
}
