import "reflect-metadata";
import { DataSource } from "typeorm";
import { Customer } from "./entities/Customer";
import { Product } from "./entities/Product";
import { Review } from "./entities/Review";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./db/shop.db",
    synchronize: true,
    logging: false,
    entities: [Customer, Product, Review],
    migrations: [],
    subscribers: [],
});
