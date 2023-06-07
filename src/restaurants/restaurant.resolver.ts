import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "@/src/restaurants/entities/restaurant.entity";
import { CreateRestaurantDto } from "@/src/restaurants/dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "@/src/restaurants/dtos/update-restaurant.dto";

@Resolver()
export class RestaurantResolver {
    @Query(() => Boolean)
    isPizzaGood() {
        return true;
    }

    @Query(() => [Restaurant])
    restaurants() {
        return [];
    }

    @Mutation(() => Restaurant)
    createRestaurant(
        @Args() { name, isVegan, ownerName }: CreateRestaurantDto,
    ) {
        return { name, isVegan, ownerName };
    }

    @Mutation(() => Restaurant)
    updateRestaurant(@Args("updateRestaurantInput") dto: UpdateRestaurantDto) {
        return { ...dto };
    }
}
