import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { VerificationEntity } from "@/src/verifications/entities/verification.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@/src/users/entities/user.entity";

@Injectable()
export class VerificationService {
    constructor(
        @InjectRepository(VerificationEntity)
        private readonly verifications: Repository<VerificationEntity>,
        @InjectRepository(UserEntity)
        private readonly users: Repository<UserEntity>,
    ) {}

    async saveVerification(user: UserEntity) {
        await this.verifications.insert(this.verifications.create({ user }));
    }

    async verifyEmail(code: string) {
        const verification = await this.verifications.findOneOrFail({
            where: { code },
            relations: {
                user: true,
            },
        });

        const result = await this.users.update(verification.user.id, {
            verified: true,
        });

        if (result.affected === 0) {
            throw new Error("Failed to update user verified status");
        }

        await this.verifications.delete(verification.id);
    }
}
