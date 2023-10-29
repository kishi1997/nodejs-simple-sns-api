import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mysql",
    password: "password",
    database: "sample",
    entities: [__dirname + "/entity/*{.js,.ts}"],
    migrations: ["src/migration/**/*.ts"],
    synchronize: false,
    logging: false,
})