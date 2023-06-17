import { Module } from "@nestjs/common";
import { VerificationResolver } from "@/src/verifications/verification.resolver";
import { VerificationService } from "@/src/verifications/verification.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VerificationEntity } from "@/src/verifications/entities/verification.entity";

@Module({
    imports: [TypeOrmModule.forFeature([VerificationEntity])],
    providers: [VerificationResolver, VerificationService],
    exports: [VerificationService],
})
export class VerificationModule {}
