import { DataSource } from "typeorm";
import post from "./entity/post";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mysql",
    password: "password",
    database: "sample",
    entities: [post],
    migrations: ["src/migration/**/*.ts"],
    synchronize: false,
    logging: false,
})