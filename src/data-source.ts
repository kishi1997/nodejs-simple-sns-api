import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Token } from "./entity/Token";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mysql",
    password: "password",
    database: "sample",
    entities: [User, Post, Token],
    migrations: ["src/migration/**/*.ts"],
    synchronize: false,
    logging: false,
})