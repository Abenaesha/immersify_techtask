import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./src/data-source";
import customersRoutes from "./src/routes/customers";
import productsRoutes from "./src/routes/products";
import reviewsRoutes from './src/routes/reviews';

const app = express();
const port = 3002;

app.use(express.json());

app.use("/", customersRoutes);
app.use("/", productsRoutes);
app.use('/', reviewsRoutes);

// Start the Express server
app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Initialized successfully");
    })
    .catch((error) => console.log(error));
