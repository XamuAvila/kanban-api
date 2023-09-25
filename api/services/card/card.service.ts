import { Card } from "@prisma/client";
import Container, { Service } from "typedi";
import { Request } from "express";
import { CreateCardRequestDto } from "../../dto/cards/request/createCard.request.dto";
import { CardRepository } from "../../repository/card.repository";
import { AuthUser } from "../../shared/interfaces/authUser.interface";
import { GetCardRequestDto } from "../../dto/cards/request/getCard.request.dto";
import { UpdateCardRequestDto } from "../../dto/cards/request/updateCard.request.dto";
import { DeleteCardRequestDto } from "../../dto/cards/request/deleteCard.request.dto";
import { logger } from "../../setup/middlewares/winston";
import { BaseError } from "../../shared/errors/baseError";
import { HTTP_STATUSES } from "../../shared/constants/httpStatuses.constants";

@Service()
export class CardService {
    async createCard(req: Request): Promise<Card> {
        const cardRepository = Container.get(CardRepository);
        const user: AuthUser = req.body.user;
        const validCard = CreateCardRequestDto.validate(req.body);
        return await cardRepository.createCard(validCard, user);
    }

    async getCards(req: Request): Promise<Card[]> {
        const cardRepository = Container.get(CardRepository);
        const user: AuthUser = req.body.user;
        return await cardRepository.getCards(user);
    }

    async getCard(req: Request): Promise<Card[]> {
        const cardRepository = Container.get(CardRepository);
        const validCardRequest = GetCardRequestDto.validate(req);
        const user: AuthUser = req.body.user;
        return await cardRepository.getCard(validCardRequest, user);
    }

    async updateCard(req: Request): Promise<Card[]> {
        const cardRepository = Container.get(CardRepository);
        const validCard = UpdateCardRequestDto.validate({...req.body, id: req.params?.id});
        const user: AuthUser = req.body.user;
        const foundCard = await cardRepository.getCard({id: validCard.id}, user);

        if(!foundCard){
            throw new BaseError("Card not found", HTTP_STATUSES.NOT_FOUND);
        }
        
        const updatedCard =  await cardRepository.updateCard(validCard, user);
        logger.info("Card Updated", { id: updatedCard[0].id, titulo: updatedCard[0].titulo, acao: "Alterar" });
        return updatedCard;
    }

    async deleteCard(req: Request): Promise<Card[]> {
        const cardRepository = Container.get(CardRepository);
        const validCard = DeleteCardRequestDto.validate(req);
        const user: AuthUser = req.body.user;
        const deletedCard = await cardRepository.deleteCard(validCard, user);
        const cards = await cardRepository.getCards(user);
        logger.info("Card Deleted", { id: deletedCard[0].id, titulo: deletedCard[0].titulo, acao: "Remover" });
        return cards;
    }
}
