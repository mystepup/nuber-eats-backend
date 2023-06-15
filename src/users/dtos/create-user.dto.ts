import { InputType, PickType } from "@nestjs/graphql";
import { UserEntity } from "@/src/users/entities/user.entity";

@InputType()
export class CreateUserInput extends PickType(UserEntity, [
    "email",
    "password",
    "role",
] as const) {}
