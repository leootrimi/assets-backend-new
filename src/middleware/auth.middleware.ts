import { Injectable, NestMiddleware } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const id_token = req.headers['id-token'];
        if (id_token) {
            try {
                const decodedUser = jwt.decode(id_token);
                req.user = decodedUser;
            } catch (err) {
                console.error('Could not decode token, invalid Token');
            }
        }
        next();
    }
}