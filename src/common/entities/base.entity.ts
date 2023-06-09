import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BaseEntity {
    @Field(() => String)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;
}
