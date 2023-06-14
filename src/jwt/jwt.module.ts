import { DynamicModule, Global, Module } from "@nestjs/common";
import { JwtService } from "@/src/jwt/jwt.service";
import { JwtOption } from "@/src/jwt/jwt-option";
import { JWT_CONFIG_OPTION } from "@/src/jwt/jwt.constant";

@Global()
@Module({})
export class JwtModule {
    static forRoot(option: JwtOption): DynamicModule {
        return {
            module: JwtModule,
            providers: [
                JwtService,
                {
                    provide: JWT_CONFIG_OPTION,
                    useValue: option,
                },
            ],
            exports: [JwtService],
        };
    }
}
