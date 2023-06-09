import { BaseEntity } from "@/src/common/entities/base.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";

@ObjectType()
@Entity({ name: "restaurants" })
export class RestaurantEntity extends BaseEntity {
    @Field(() => String)
    @Column()
    public readonly name: string;

    @Field(() => Boolean)
    @Column()
    public readonly isVegan: boolean;

    @Field(() => String)
    @Column()
    public readonly ownerName: string;
}
