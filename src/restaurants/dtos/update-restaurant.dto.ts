import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateRestaurantDto {
    @Field(() => String)
    name: string;

    @Field(() => Boolean)
    isVegan: boolean;

    @Field(() => String)
    ownerName: string;
}
