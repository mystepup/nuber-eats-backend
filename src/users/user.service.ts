import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@/src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "@/src/users/dtos/create-user.dto";
import { LoginInput } from "@/src/users/dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import { EditProfileInput } from "@/src/users/dtos/edit-profile.dto";
import { VerificationService } from "@/src/verifications/verification.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly users: Repository<UserEntity>,
        private readonly verificationService: VerificationService,
        private readonly jwtService: JwtService,
    ) {}

    async createUser({
        email,
        password,
        role,
    }: CreateUserInput): Promise<UserEntity> {
        const user = await this.users.save(
            this.users.create({ email, password, role }),
        );
        await this.verificationService.saveVerification(user);
        return user;
    }

    async login({ email, password }: LoginInput) {
        const user = await this.users.findOneOrFail({ where: { email } });
        const ok = await user.checkPassword(password);
        if (ok) {
            return this.jwtService.sign({ id: user.id });
        } else {
            throw new Error("password mismatch");
        }
    }

    findById(id: string): Promise<UserEntity> {
        return this.users.findOneByOrFail({ id });
    }

    async editProfile(
        id: string,
        { email, password }: EditProfileInput,
    ): Promise<UserEntity> {
        const prevUser = await this.users.findOneByOrFail({ id });
        if (email) {
            prevUser.email = email;
        }
        if (password) {
            prevUser.password = password;
        }
        return await this.users.save(prevUser);
    }
}
