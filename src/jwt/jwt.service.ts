import { Inject, Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken";
import { JWT_CONFIG_OPTION } from "@/src/jwt/jwt.constant";
import { JwtOption } from "@/src/jwt/jwt-option";

@Injectable()
export class JwtService {
    constructor(
        @Inject(JWT_CONFIG_OPTION) private readonly option: JwtOption,
    ) {}
    sign(userId: string): string {
        return jwt.sign({ id: userId }, this.option.privateKey);
    }
}
