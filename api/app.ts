import express from "express";
import cors from "cors";
import { Routes } from "./setup/routes";

export class App {
    private app = express();

    initialize() {
        this.app.use(cors({origin: "*"}));
        this.app.use(express.json());

        Routes.initializeRoutes(this.app);

        this.app.listen(process.env.PORT, () => {
            console.log("Application Running 🚀");
        });
    }
}
