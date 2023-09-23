import { PrismaClient, Usuario } from "@prisma/client";
import { Service } from "typedi";
import { AuthMiddleware } from "../setup/middlewares/auth.middleware";
import { UserSignupRequestDto } from "../dto/user/signup/request/user.signup.request.dto";
@Service()
export class UserRepository {
    private prismaClient!: PrismaClient;
    constructor(){
        this.prismaClient = new PrismaClient();
    }
    async createUser(usuario: UserSignupRequestDto): Promise<Usuario> {
        await this.prismaClient.$connect();
        const createdUser: Usuario = await this.prismaClient.usuario.create({
            data: {
                ...usuario,
                senha: await AuthMiddleware.hashPassword(usuario.senha)
            }
        }).finally(async ()=>{
            await this.prismaClient.$disconnect();
        });
        return createdUser;
    }

    async getUserByLogin(login: string): Promise<Usuario | null> {
        await this.prismaClient.$connect();
        const user = await this.prismaClient.usuario.findUnique({
            where: {
                login: login
            }
        });
        return user;
    }
}
