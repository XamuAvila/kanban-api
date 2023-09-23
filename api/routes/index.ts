import { Application, Router } from "express";
import {UserRoutes} from "./user.routes";

const initializeRoutes = (app: Application) =>{
    const router = Router();
    new UserRoutes(router);
    app.use(router);
};

export {
    initializeRoutes
};
