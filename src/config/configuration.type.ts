export type Configuration = {
    port: number;
    database: DATABASE;
};

export type DATABASE = {
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
};
