import express from "express";
import { serveClientHTML } from "../controllers/IndexController";

const indexRouter = express.Router();

indexRouter.get("", serveClientHTML);

export { indexRouter };
