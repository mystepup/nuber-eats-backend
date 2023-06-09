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

    @Mutation(() => Boolean)
    createRestaurant(
        @Args("input") createRestaurantDto: CreateRestaurantDto,
    ): boolean {
        console.log(createRestaurantDto);
        try {
            this.restaurantService.createRestaurant(createRestaurantDto);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    @Mutation(() => Boolean)
    updateRestaurant(@Args() updateRestaurantDto: UpdateRestaurantDto) {
        try {
            this.restaurantService.updateRestaurant(updateRestaurantDto);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}
