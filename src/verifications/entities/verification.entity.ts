import { BaseEntity } from "@/src/common/entities/base.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "@/src/users/entities/user.entity";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { v4 } from "uuid";

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: "verifications" })
export class VerificationEntity extends BaseEntity {
    @Field(() => String)
    @Column()
    @IsString()
    code: string;

    @Field(() => UserEntity)
    @OneToOne(() => UserEntity, { onDelete: "CASCADE" })
    @JoinColumn()
    user: UserEntity;

    @BeforeInsert()
    generateCode() {
        this.code = v4();
    }
}
