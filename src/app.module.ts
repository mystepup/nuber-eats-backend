import { Module } from "@nestjs/common";
import { AppController } from "@/src/app.controller";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { RestaurantModule } from "@/src/restaurants/restaurant.module";

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
            // authSchemaFile: true
        }),
        RestaurantModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
