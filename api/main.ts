import "reflect-metadata";
import dotenv from "dotenv";
import { App } from "./app";
import fs from "node:fs";
import { DependencyInjection } from "./setup/dependencyInjection";
dotenv.config();

class Main {
    static async start(){
        const app = new App();
        if (!fs.existsSync("../../logs")) {
            fs.mkdirSync("../../logs");
        }
        DependencyInjection.startup();
        app.initialize();
    }
}

Main.start();
