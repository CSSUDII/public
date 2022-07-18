import { MetadataKeys } from "./metadata";

const ClassRouter = (basePath: string): ClassDecorator => {
    return (target) => {
        Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
    };
};

export default ClassRouter;
