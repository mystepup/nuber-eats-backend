import { BaseEntity } from "@/src/common/entities/base.entity";
import {
    Field,
    InputType,
    ObjectType,
    registerEnumType,
} from "@nestjs/graphql";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { IsEmail, IsEnum, IsString } from "class-validator";
import bcrypt from "bcrypt";

enum Role {
    Client = "Client",
    Owner = "Owner",
    Delivery = "Delivery",
}

registerEnumType(Role, { name: "Role" });
@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
    @Field(() => String)
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Field(() => String)
    @Column()
    @IsString()
    password: string;

    @Field(() => Role)
    @Column("enum", { enum: Role })
    @IsEnum(Role)
    role: Role;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    checkPassword(password): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
