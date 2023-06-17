import { ObjectType, PickType } from "@nestjs/graphql";
import { UserEntity } from "@/src/users/entities/user.entity";

export type User = Pick<
    UserEntity,
    "id" | "createdAt" | "updatedAt" | "email" | "role" | "verified"
>;
@ObjectType()
export class UserOutput extends PickType(
    UserEntity,
    ["id", "createdAt", "updatedAt", "email", "role", "verified"] as const,
    ObjectType,
) {
    constructor(user: User | UserEntity) {
        super();
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.updatedAt = user.createdAt;
        this.email = user.email;
        this.role = user.role;
        this.verified = user.verified;
    }
}
