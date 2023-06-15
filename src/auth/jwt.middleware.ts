import {
    BadRequestException,
    Injectable,
    NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "@/src/users/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = this.extractTokenFromHeader(req);
        if (!token) {
            next();
        } else {
            try {
                const decoded = this.jwtService.verify(token);
                if (
                    typeof decoded === "object" &&
                    decoded.hasOwnProperty("id")
                ) {
                    const { password, ...userWithoutPassword } =
                        await this.userService.findById(decoded.id);
                    req["user"] = userWithoutPassword;
                }
                next();
            } catch (e) {
                throw new BadRequestException(e.message);
            }
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
