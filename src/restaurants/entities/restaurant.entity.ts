import { BaseEntity } from "@/src/common/entities/base.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

@ObjectType()
@Entity({ name: "restaurants" })
export class RestaurantEntity extends BaseEntity {
    @Field(() => String)
    @Column()
    @IsString()
    @Length(5, 10)
    public readonly name: string;

    @Field(() => Boolean, { defaultValue: true })
    @Column({ default: true })
    @IsOptional()
    @IsBoolean()
    public readonly isVegan: boolean;

    @Field(() => String)
    @Column()
    @IsString()
    public readonly address: string;
}
