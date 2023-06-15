import { Injectable, NestMiddleware } from "@nestjs/common";
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
        const token = req.headers["x-jwt"];
        try {
            const decoded = this.jwtService.verify(token.toString());
            if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
                const { password, ...userWithoutPassword } =
                    await this.userService.findById(decoded.id);
                req["user"] = userWithoutPassword;
            }
            next();
        } catch (e) {
            console.error(e);
        }
    }
}
