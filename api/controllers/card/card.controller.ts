/* eslint-disable @typescript-eslint/no-explicit-any */
import Container, { Service } from "typedi";
import { Request, Response } from "express";
import { CardService } from "../../services/card/card.service";
import { Card } from "@prisma/client";
@Service()
export class CardController {
    async createCard(req: Request, res: Response): Promise<void> {
        try {
            const cardService = Container.get(CardService);
            const createdCard = await cardService.createCard(req);
            res.status(200).send(createdCard);
        } catch (error: any) {
            res.status(error?.statusCode ?? 500).send({
                message: error.message
            });
        }
    }

    async getCards(req: Request, res: Response): Promise<void> {
        try {
            const cardService = Container.get(CardService);
            const cards: Card[] = await cardService.getCards(req);
            res.status(200).json(cards);
        } catch (error: any) {
            res.status(error?.statusCode ?? 500).send({
                message: error.message
            });
        }
    }

    async getCard(req: Request, res: Response): Promise<void> {
        try {
            const cardService = Container.get(CardService);
            const card: Card[] = await cardService.getCard(req);
            res.status(200).send(card);
        } catch (error: any) {
            res.status(error?.statusCode ?? 500).send({
                message: error.message
            });
        }
    }

    async updateCard(req: Request, res: Response): Promise<void> {
        try {
            const cardService = Container.get(CardService);
            const updatedCard: Card[] = await cardService.updateCard(req);
            res.status(200).send(updatedCard);
        } catch (error: any) {
            res.status(error?.statusCode ?? 500).send({
                message: error.message
            });
        }
    }

    async deleteCard(req: Request, res: Response): Promise<void> {
        try {
            const cardService = Container.get(CardService);
            const deletedCard: Card[] = await cardService.deleteCard(req);
            res.status(200).send(deletedCard);
        } catch (error: any) {
            res.status(error?.statusCode ?? 500).send({
                message: error.message
            });
        }
    }
}
