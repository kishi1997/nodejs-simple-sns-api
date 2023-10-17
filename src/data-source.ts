import { DataSource } from "typeorm";
import { Post } from "./entity/Post";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mysql",
    password: "password",
    database: "sample",
    entities: [Post],
    migrations: ["src/migration/**/*.ts"],
    synchronize: false,
    logging: false,
})