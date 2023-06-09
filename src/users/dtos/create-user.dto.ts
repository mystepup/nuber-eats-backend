import { InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { UserEntity } from "@/src/users/entities/user.entity";

@InputType()
export class CreateUserInput extends PickType(UserEntity, [
    "email",
    "password",
    "role",
] as const) {}

@ObjectType()
export class CreateUserOutput extends OmitType(
    UserEntity,
    ["password"] as const,
    ObjectType,
) {
    constructor(user: UserEntity) {
        super();
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.updatedAt = user.createdAt;
        this.email = user.email;
        this.role = user.role;
    }
}
