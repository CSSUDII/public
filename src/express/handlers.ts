import { MetadataKeys } from "./metadata";

export enum Methods {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    DELETE = "delete",
}

export interface IRouter {
    method: Methods;
    path: string;
    handlerName: string | symbol;
}

export interface IUse {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any;
}

const methodDecoratorFactory = (method: Methods) => {
    return (path: string): MethodDecorator => {
        return (target, propertyKey) => {
            const Class = target.constructor;
            const routers: IRouter[] = Reflect.hasMetadata(
                MetadataKeys.ROUTERS,
                Class
            )
                ? Reflect.getMetadata(MetadataKeys.ROUTERS, Class)
                : [];
            routers.push({
                method,
                path,
                handlerName: propertyKey,
            });

            Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, Class);
        };
    };
};

const useDecoratorFactory = () => {
    return (o): ClassDecorator => {
        return (target) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const uses: IUse[] = Reflect.hasMetadata(
                MetadataKeys.SERVER_USE,
                target
            )
                ? Reflect.getMetadata(MetadataKeys.SERVER_USE, target)
                : [];

            uses.push({
                object: o,
            });

            Reflect.defineMetadata(MetadataKeys.SERVER_USE, uses, target);
        };
    };
};

const ratelimitDecoratorFactory = () => {
    return (time: number): MethodDecorator => {
        return (target) => {
            const basePath = Reflect.getMetadata(
                MetadataKeys.BASE_PATH,
                target.constructor
            );

            Reflect.defineMetadata(MetadataKeys.RATELIMIT, time, target);
        };
    };
};

const checkTokenDecorator = () => {
    return (): ClassDecorator => {
        return (target) => {
            // TODO
        };
    };
};

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Patch = methodDecoratorFactory(Methods.PATCH);
export const Delete = methodDecoratorFactory(Methods.DELETE);

export const Use = useDecoratorFactory();
export const CheckToken = checkTokenDecorator();
//export const RateLimit = ratelimitDecoratorFactory();
