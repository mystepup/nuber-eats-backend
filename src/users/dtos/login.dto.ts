import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { UserEntity } from "@/src/users/entities/user.entity";

@InputType()
export class LoginInput extends PickType(UserEntity, [
    "email",
    "password",
] as const) {}

@ObjectType()
export class LoginOutput {
    @Field(() => String)
    token: string;

    constructor(token: string) {
        this.token = token;
    }
}
