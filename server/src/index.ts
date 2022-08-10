import ENV from "./env";
import express from "express";
import { indexRouter } from "./routes/IndexRouter";
import path from "path";
const app = express();

app.use(express.static(path.resolve(__dirname + "../../client/build")));

app.use("*", indexRouter);

app.listen(ENV.PORT);

console.log("Listening on ", ENV.PORT);
