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
    ) {}

    async saveVerification(user: UserEntity) {
        const result = await this.verifications.insert(
            this.verifications.create({ user }),
        );
    }
}
