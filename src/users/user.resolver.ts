import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
    CreateUserInput,
    CreateUserOutput,
} from "@/src/users/dtos/create-user.dto";
import { UserService } from "@/src/users/user.service";
import {
    BadRequestException,
    NotFoundException,
    UseGuards,
} from "@nestjs/common";
import { LoginInput, LoginOutput } from "@/src/users/dtos/login.dto";
import { EntityNotFoundError } from "typeorm";
import { AuthGuard } from "@/src/auth/auth.guard";
import { AuthUser } from "@/src/auth/auth-user.decorator";
import { AuthUserDto, AuthUserOutput } from "@/src/users/dtos/auth-user.dto";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Query(() => AuthUserOutput)
    me(@AuthUser() user: AuthUserDto) {
        return user;
    }

    @Mutation(() => CreateUserOutput)
    async createUser(@Args("input") createUserInput: CreateUserInput) {
        try {
            const user = await this.userService.createUser(createUserInput);
            return new CreateUserOutput(user);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Mutation(() => LoginOutput)
    async login(@Args("input") loginInput: LoginInput) {
        try {
            const token = await this.userService.login(loginInput);

            return new LoginOutput(token);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }
}
