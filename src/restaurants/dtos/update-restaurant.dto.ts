import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateRestaurantDto } from "@/src/restaurants/dtos/create-restaurant.dto";
import { IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

@ArgsType()
export class UpdateRestaurantDto {
    @Field(() => String)
    @IsString()
    id: string;

    @Field(() => UpdateRestaurantInputType)
    @ValidateNested()
    @Type(() => UpdateRestaurantInputType)
    data: UpdateRestaurantInputType;
}
