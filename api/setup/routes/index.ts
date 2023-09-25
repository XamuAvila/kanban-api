import { Application, Router } from "express";
import {UserRoutes} from "./user.routes";
import { CardRouter } from "./card.routes";

export class Routes {
    static initializeRoutes = (app: Application) =>{
        const router = Router();
        new UserRoutes(router);
        new CardRouter(router);
        app.use(router);
    };
}
