import { InputType, PickType } from "@nestjs/graphql";
import { VerificationEntity } from "@/src/verifications/entities/verification.entity";

@InputType()
export class VerificationInput extends PickType(VerificationEntity, ["code"]) {}
