import { NestMiddleware } from "@nestjs/common";

export class LoggerMiddleware implements NestMiddleware {

    use(req: any, res: any, next: (error?: any) => void) {
        console.log(
            `request:`, {
                headers: req.headers,
                body: req.body,
                url: req.url
            }
        );
        if (next) {
            next();
        }
    }
}