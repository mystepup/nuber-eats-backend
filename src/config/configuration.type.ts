export type Configuration = {
    port: number;
    database: DATABASE;
    jwt: JWT;
};

export type DATABASE = {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
};

export type JWT = {
    privateKey: string;
};
