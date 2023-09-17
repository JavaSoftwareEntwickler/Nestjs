import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request = ctx
        .switchToHttp()
        .getRequest();
        if(data){
            return {id: request.user[data]}
        }
        return request.user;
    },
);