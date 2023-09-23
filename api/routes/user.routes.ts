import { Router } from "express";
import { IBasicRoute } from "./routes.interface";
import { UserController } from "../controllers/user/user.controller";
import {Inject, Container} from "typedi";

export class UserRoutes implements IBasicRoute {
    constructor(private router: Router, 
        @Inject() private userController: UserController = Container.get(UserController)) {
        this.init();
    }

    init() {
        this.router.post("/signup", this.userController.signUp);
    }
}


