import cors from "cors";
import express from "express";
import { ListenerPlugin, RouterPlugin } from "./plugins";
import { dbConnect } from "./configs";
import bodyParser from "body-parser";
dbConnect()
const app = express();

app
  .use(cors())
  .options("*", cors())
  .use(express.json({ limit: "50mb" }))
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

RouterPlugin.setup(app);
ListenerPlugin.listen(app);