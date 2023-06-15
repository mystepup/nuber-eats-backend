import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
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
import { User, UserOutput } from "@/src/users/dtos/user.dto";
import { CreateUserInput } from "@/src/users/dtos/create-user.dto";
import { UserProfileInput } from "@/src/users/dtos/user-profile.dto";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Query(() => UserOutput)
    me(@AuthUser() user: User) {
        return new UserOutput(user);
    }

    @Query(() => UserOutput)
    async userProfile(@Args() { id }: UserProfileInput) {
        try {
            const { password, ...user } = await this.userService.findById(id);
            return new UserOutput(user);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    @Mutation(() => UserOutput)
    async createUser(@Args("input") createUserInput: CreateUserInput) {
        try {
            const user = await this.userService.createUser(createUserInput);
            return new UserOutput(user);
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
