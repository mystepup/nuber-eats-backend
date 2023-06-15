import { UserEntity } from "@/src/users/entities/user.entity";
import { ObjectType, OmitType } from "@nestjs/graphql";

export type AuthUserDto = Omit<UserEntity, "password">;

@ObjectType()
export class AuthUserOutput extends OmitType(
    UserEntity,
    ["password"],
    ObjectType,
) {}
