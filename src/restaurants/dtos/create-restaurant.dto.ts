import { InputType, OmitType } from "@nestjs/graphql";
import { RestaurantEntity } from "@/src/restaurants/entities/restaurant.entity";

@InputType()
export class CreateRestaurantDto extends OmitType(
    RestaurantEntity,
    ["id", "createdAt", "updatedAt"] as const,
    InputType,
) {}
