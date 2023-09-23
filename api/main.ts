import "reflect-metadata";
import dotenv from "dotenv";
import { App } from "./app";
import { DependencyInjection } from "./dependencyInjection";
dotenv.config();

class Main {
    static async start(){
        const app = new App();
        DependencyInjection.startup();
        app.initialize();
    }
}

Main.start();
