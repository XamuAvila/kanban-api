import { Card, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { CreateCardRequestDto } from "../dto/cards/request/createCard.request.dto";
import { AuthUser } from "../shared/interfaces/authUser.interface";
import { GetCardRequestDto } from "../dto/cards/request/getCard.request.dto";
import { BaseError } from "../shared/errors/baseError";
import { HTTP_STATUSES } from "../shared/constants/httpStatuses.constants";
import { UpdateCardRequestDto } from "../dto/cards/request/updateCard.request.dto";
import { DeleteCardRequestDto } from "../dto/cards/request/deleteCard.request.dto";

@Service()
export class CardRepository {
    private prismaClient!: PrismaClient;
    constructor(){
        this.prismaClient = new PrismaClient();
    }
    async createCard(card: CreateCardRequestDto, user: AuthUser): Promise<Card>{
        await this.prismaClient.$connect();
        const createdCard = await this.prismaClient.card.create({
            data: {
                ...card,
                idUsuario: user.id
            }
        }).finally(async()=>{
            await this.prismaClient.$disconnect();
        });

        return createdCard;
    }
    async getCards(user: AuthUser): Promise<Card[]>{
        await this.prismaClient.$connect();
        const cards = await this.prismaClient.card.findMany({
            where: {
                idUsuario: user.id
            }
        });

        if(!cards){
            throw new BaseError("No cards found", HTTP_STATUSES.NOT_FOUND);
        }

        return cards ?? [];
    }
    async getCard(card: GetCardRequestDto, user: AuthUser): Promise<Card[]>{
        await this.prismaClient.$connect();
        const foundCard = await this.prismaClient.card.findUnique({
            where : {
                idUsuario: user.id,
                id: card.id
            }
        });

        if(!foundCard){
            throw new BaseError("Card not found", HTTP_STATUSES.NOT_FOUND);
        }
        return [foundCard];
    }
    async updateCard(card: UpdateCardRequestDto, user: AuthUser): Promise<Card[]>{
        await this.prismaClient.$connect();
        const updatedCard = await this.prismaClient.card.update({
            where: {
                id: card.id,
                idUsuario: user.id
            },
            data: {
                ...card
            }
        });

        if(!updatedCard){
            throw new BaseError("Error while updating card", HTTP_STATUSES.BAD_REQUEST);
        }

        return [updatedCard];
    }
    async deleteCard(card: DeleteCardRequestDto, user: AuthUser): Promise<Card[]>{
        await this.prismaClient.$connect();
        const deletedCard = await this.prismaClient.card.delete({
            where: {
                idUsuario: user.id,
                id: card.id
            }
        });
        if(!deletedCard){
            throw new BaseError("Card ID not found", HTTP_STATUSES.BAD_REQUEST);
        }

        return [deletedCard];
    }
}
