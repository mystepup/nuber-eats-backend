import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserResolver } from "@/src/users/user.resolver";
import { UserService } from "@/src/users/user.service";
import { UserEntity } from "@/src/users/entities/user.entity";
import { VerificationModule } from "@/src/verifications/verification.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), VerificationModule],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}
