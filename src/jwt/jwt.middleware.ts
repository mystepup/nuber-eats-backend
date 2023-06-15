import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { JwtService } from "@/src/jwt/jwt.service";
import { UserService } from "@/src/users/user.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["x-jwt"];
        try {
            const decoded = this.jwtService.decode(token);
            if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
                const { password, ...userWithoutPassword } =
                    await this.userService.findById(decoded.id);
                req["user"] = userWithoutPassword;
            }
        } catch (e) {
            console.error(e);
        }
        next();
    }
}
