import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@/src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "@/src/users/dtos/create-user.dto";
import { LoginInput } from "@/src/users/dtos/login.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly users: Repository<UserEntity>,
    ) {}

    createUser({
        email,
        password,
        role,
    }: CreateUserInput): Promise<UserEntity> {
        return this.users.save(this.users.create({ email, password, role }));
    }

    async login({ email, password }: LoginInput) {
        const user = await this.users.findOneOrFail({ where: { email } });
        const ok = await user.checkPassword(password);
        if (ok) {
            return "lalala";
        } else {
            throw new Error("password mismatch");
        }
    }
}
