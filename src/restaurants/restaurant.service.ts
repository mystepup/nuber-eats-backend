import { Injectable } from "@nestjs/common";
import { RestaurantEntity } from "@/src/restaurants/entities/restaurant.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(RestaurantEntity)
        private readonly restaurants: Repository<RestaurantEntity>,
    ) {}
    getAll(): Promise<RestaurantEntity[]> {
        return this.restaurants.find();
    }
}
