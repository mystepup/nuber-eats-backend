import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { VerificationEntity } from "@/src/verifications/entities/verification.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@/src/users/entities/user.entity";

@Injectable()
export class VerificationService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(VerificationEntity)
        private readonly verifications: Repository<VerificationEntity>,
        @InjectRepository(UserEntity)
        private readonly users: Repository<UserEntity>,
    ) {}

    async verifyEmail(code: string) {
        const verification = await this.verifications.findOneOrFail({
            where: { code },
            relations: {
                user: true,
            },
        });

        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await queryRunner.manager.update(
                UserEntity,
                verification.user.id,
                {
                    verified: true,
                },
            );

            if (result.affected === 0) {
                throw new Error("Failed to update user verified status");
            }

            await queryRunner.manager.delete(
                VerificationEntity,
                verification.id,
            );

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(error.message);
        } finally {
            await queryRunner.release();
        }
    }
}
