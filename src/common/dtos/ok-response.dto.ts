import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class OkResponseDto {
    @Field(() => Boolean)
    ok: boolean;
}
