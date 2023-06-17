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
import { UserOutput } from "@/src/users/dtos/user.dto";
import { CreateUserInput } from "@/src/users/dtos/create-user.dto";
import { UserProfileInput } from "@/src/users/dtos/user-profile.dto";
import { EditProfileInput } from "@/src/users/dtos/edit-profile.dto";
import { UserEntity } from "@/src/users/entities/user.entity";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Query(() => UserOutput)
    me(@AuthUser() user: UserEntity): UserOutput {
        return new UserOutput(user);
    }

    @Query(() => UserOutput)
    async userProfile(@Args() { id }: UserProfileInput): Promise<UserOutput> {
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
    async createUser(
        @Args("input") createUserInput: CreateUserInput,
    ): Promise<UserOutput> {
        try {
            const user = await this.userService.createUser(createUserInput);
            return new UserOutput(user);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UserOutput)
    async editProfile(
        @AuthUser() user: UserEntity,
        @Args("input") input: EditProfileInput,
    ): Promise<UserOutput> {
        try {
            const edited = await this.userService.editProfile(user.id, input);
            return new UserOutput(edited);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(error.message);
            }
            throw new BadRequestException(error.message);
        }
    }

    @Mutation(() => LoginOutput)
    async login(@Args("input") loginInput: LoginInput): Promise<LoginOutput> {
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
