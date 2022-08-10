import express from "express";
import path from "path";

const serveClientHTML = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname + "/../../../client/build/index.html"));
};

export { serveClientHTML };
