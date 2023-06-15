import { InputType, PartialType, PickType } from "@nestjs/graphql";
import { UserEntity } from "@/src/users/entities/user.entity";

@InputType()
export class EditProfileInput extends PartialType(
    PickType(UserEntity, ["email", "password"]),
) {}
