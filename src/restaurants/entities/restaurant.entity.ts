import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Restaurant {
    @Field(() => String)
    public readonly name: string;

    @Field(() => Boolean)
    public readonly isVegan: boolean;

    @Field(() => String)
    public readonly ownerName: string;
}
