import { Module } from "@nestjs/common";
import { RestaurantResolver } from "@/src/restaurants/restaurant.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantEntity } from "@/src/restaurants/entities/restaurant.entity";
import { RestaurantService } from "@/src/restaurants/restaurant.service";

@Module({
    imports: [TypeOrmModule.forFeature([RestaurantEntity])],
    providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
