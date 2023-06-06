import { Module } from "@nestjs/common";
import { RestaurantResolver } from "@/src/restaurants/restaurant.resolver";

@Module({
    providers: [RestaurantResolver],
})
export class RestaurantModule {}
