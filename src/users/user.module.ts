import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserResolver } from "@/src/users/user.resolver";
import { UserService } from "@/src/users/user.service";
import { UserEntity } from "@/src/users/entities/user.entity";
import { VerificationEntity } from "@/src/verifications/entities/verification.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, VerificationEntity])],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
