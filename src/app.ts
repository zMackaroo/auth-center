import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import { NotFound } from "./middlewares/not-found.middleware";
import { ErrorHandler } from "./middlewares/error-handler.middleware";
import routes from "./routes";
import { swaggerSpec } from "./config/swagger.config";

dotenv.config();

const App: Application = express();

App.use(helmet());
App.use(cors());

App.use(express.json({ limit: "10kb" }));
App.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Swagger Documentation
App.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
App.use("/api/v1", routes);

// Middlewares
App.use(NotFound);
App.use(ErrorHandler);

export default App;
