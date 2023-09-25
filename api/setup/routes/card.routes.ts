import { Router } from "express";
import { IBasicRoute } from "../../shared/interfaces/routes.interface";
import Container, { Inject } from "typedi";
import { CardController } from "../../controllers/card/card.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CardRouter implements IBasicRoute{
    constructor(private router: Router, 
        @Inject() private cardController: CardController = Container.get(CardController)) {
        this.init();
    }

    init() {
        this.router.post("/cards", AuthMiddleware.validate, this.cardController.createCard);
        this.router.get("/cards/:id", AuthMiddleware.validate, this.cardController.getCard);
        this.router.get("/cards", AuthMiddleware.validate, this.cardController.getCards);
        this.router.put("/cards/:id", AuthMiddleware.validate, this.cardController.updateCard);
        this.router.delete("/cards/:id", AuthMiddleware.validate, this.cardController.deleteCard);
    }
}
