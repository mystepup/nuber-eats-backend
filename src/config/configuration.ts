import { Configuration } from "@/src/config/configuration.type";
import Joi from "joi";

export default function getConfig(): Configuration {
    const config: Configuration = {
        port: Number.parseInt(process.env.PORT, 10),
        database: {
            host: process.env.DB_HOST,
            port: Number.parseInt(process.env.DB_PORT, 10),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            name: process.env.DB_NAME,
        },
        jwt: {
            privateKey: process.env.JWT_PRIVATE_KEY,
        },
    };

    const configValidateSchema = Joi.object<Configuration, true>({
        port: Joi.number().required(),
        database: Joi.object({
            host: Joi.string().required(),
            port: Joi.number().required(),
            user: Joi.string().required(),
            password: Joi.string().allow("").required(),
            name: Joi.string().required(),
        }).required(),
        jwt: Joi.object({
            privateKey: Joi.string().required(),
        }).required(),
    });

    const validateResult = configValidateSchema.validate(config);

    if (validateResult.error) {
        throw new Error(validateResult.error.message);
    }

    return config;
}
