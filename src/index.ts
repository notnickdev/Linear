import { Bot } from "./client/Client";
import * as File from "../src/config.json";
import { Config } from "./interfaces/Config";

require("dotenv").config();

new Bot().start(File as Config);
