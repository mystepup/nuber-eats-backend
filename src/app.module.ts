import { Module } from "@nestjs/common";
import { AppController } from "@/src/app.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import getConfig from "@/src/config/configuration";
import Joi from "joi";
import { DATABASE } from "@/src/config/configuration.type";
import { UserModule } from "@/src/users/user.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [getConfig],
            isGlobal: true,
            cache: true,
            envFilePath: process.env.NODE_ENV === "dev" ? ".env" : ".env.test",
            ignoreEnvFile: process.env.NODE_ENV === "prod",
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("dev", "prod", "test").required(),
            }),
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
            // authSchemaFile: true
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const database = configService.get<DATABASE>("database");
                return {
                    type: "postgres",
                    host: database.host,
                    port: database.port,
                    username: database.user,
                    password: database.password,
                    database: database.name,
                    entities: [__dirname + "/**/*.entity{.ts,.js}"],
                    synchronize: process.env.NODE_ENV !== "prod",
                    logging: true,
                };
            },
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
