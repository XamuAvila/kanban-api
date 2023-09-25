import winston, { createLogger, format, transports } from "winston";
import path from "path";
import { TransformableInfo } from "../../../node_modules/logform/index";

interface CUSTOM_LOG_WINSTON extends TransformableInfo {
    timestamp: number;
    id: string;
    titulo: string;
    acao: string;
}

const customLogFormat = winston.format.printf((param: CUSTOM_LOG_WINSTON | TransformableInfo) => {
    return `${param.timestamp} - Card ${param.id} - ${param.titulo} - ${param.acao}`;
});

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "DD/MM/YYYY HH:mm:ss"
        }),
        customLogFormat
    ),
    defaultMeta: {
        service: "uasdc-video-converter-ts"
    },
    transports: [
        new transports.File({ filename: path.resolve(__dirname, "..", "..", "..", "logs", "messages.log") }),
        new transports.File({ filename: path.resolve(__dirname, "..", "..", "..", "logs", "errors.log"), level: "error" })
    ]
});

logger.add(new transports.Console({
    format: format.combine(
        format.colorize(),
        format.simple()
    )
}));

export { logger };
