import { ArgsType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ArgsType()
export class UserProfileInput {
    @Field(() => String)
    @IsString()
    id: string;
}
