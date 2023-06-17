import { ObjectType, OmitType } from "@nestjs/graphql";
import { UserEntity } from "@/src/users/entities/user.entity";

@ObjectType()
export class UserOutput extends OmitType(
    UserEntity,
    ["password"] as const,
    ObjectType,
) {
    constructor(user: Partial<UserEntity>) {
        super();
        this.id = user.id;
        this.createdAt = user.createdAt;
        this.updatedAt = user.createdAt;
        this.email = user.email;
        this.role = user.role;
        this.verified = user.verified;
    }
}
