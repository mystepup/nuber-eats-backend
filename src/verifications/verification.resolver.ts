import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { VerificationService } from "@/src/verifications/verification.service";
import { OkResponseDto } from "@/src/common/dtos/ok-response.dto";
import { VerificationInput } from "@/src/verifications/dtos/verification.dto";
import { BadRequestException } from "@nestjs/common";

@Resolver()
export class VerificationResolver {
    constructor(private readonly verificationService: VerificationService) {}

    @Mutation(() => OkResponseDto)
    async verifyEmail(
        @Args("input") { code }: VerificationInput,
    ): Promise<OkResponseDto> {
        try {
            await this.verificationService.verifyEmail(code);
            return { ok: true };
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
