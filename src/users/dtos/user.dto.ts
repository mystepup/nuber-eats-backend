import { ObjectType, PickType } from "@nestjs/graphql";
import { UserEntity } from "@/src/users/entities/user.entity";

export type User = Pick<
    UserEntity,
    "id" | "createdAt" | "updatedAt" | "email" | "role"
>;
@ObjectType()
export class UserOutput extends PickType(
    UserEntity,
    ["id", "createdAt", "updatedAt", "email", "role"] as const,
    ObjectType,
) {
    constructor(user: User) {
        super();
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.updatedAt = user.createdAt;
        this.email = user.email;
        this.role = user.role;
    }
}
