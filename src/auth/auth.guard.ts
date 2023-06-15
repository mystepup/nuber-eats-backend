import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { GqlExecutionContext } from "@nestjs/graphql";

export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const gqlContext = GqlExecutionContext.create(context).getContext();
        return !!gqlContext.user;
    }
}
