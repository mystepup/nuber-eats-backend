import { Module } from "@nestjs/common";
import { VerificationResolver } from "@/src/verifications/verification.resolver";
import { VerificationService } from "@/src/verifications/verification.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VerificationEntity } from "@/src/verifications/entities/verification.entity";
import { UserEntity } from "@/src/users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([VerificationEntity, UserEntity])],
    providers: [VerificationResolver, VerificationService],
    exports: [VerificationService],
})
export class VerificationModule {}
