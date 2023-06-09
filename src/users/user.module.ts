import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserResolver } from "@/src/users/user.resolver";
import { UserService } from "@/src/users/user.service";
import { UserEntity } from "@/src/users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserResolver, UserService],
})
export class UserModule {}
