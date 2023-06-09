import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "@/src/restaurants/dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "@/src/restaurants/dtos/update-restaurant.dto";
import { RestaurantService } from "@/src/restaurants/restaurant.service";
import { RestaurantEntity } from "@/src/restaurants/entities/restaurant.entity";

@Resolver()
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService) {}
    @Query(() => Boolean)
    isPizzaGood() {
        return true;
    }

    @Query(() => [RestaurantEntity])
    restaurants(): Promise<RestaurantEntity[]> {
        return this.restaurantService.getAll();
    }

    @Mutation(() => RestaurantEntity)
    createRestaurant(
        @Args() { name, isVegan, ownerName }: CreateRestaurantDto,
    ) {
        return { name, isVegan, ownerName };
    }

    @Mutation(() => RestaurantEntity)
    updateRestaurant(@Args("updateRestaurantInput") dto: UpdateRestaurantDto) {
        return { ...dto };
    }
}
