import { Injectable } from "@nestjs/common";
import { RestaurantEntity } from "@/src/restaurants/entities/restaurant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "@/src/restaurants/dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "@/src/restaurants/dtos/update-restaurant.dto";

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(RestaurantEntity)
        private readonly restaurants: Repository<RestaurantEntity>,
    ) {}
    getAll(): Promise<RestaurantEntity[]> {
        return this.restaurants.find();
    }

    createRestaurant(
        createRestaurantDto: CreateRestaurantDto,
    ): Promise<RestaurantEntity> {
        const newRestaurant = this.restaurants.create({
            ...createRestaurantDto,
        });
        return this.restaurants.save(newRestaurant);
    }

    updateRestaurant({ data, id }: UpdateRestaurantDto) {
        return this.restaurants.update(id, { ...data });
    }
}
