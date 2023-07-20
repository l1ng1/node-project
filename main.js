import {Application} from "./bin/app.js";
import fs from 'fs';

const cfg_file = fs.readFileSync("./config.json");
const config = JSON.parse(cfg_file);

const app = new Application(config);

app.start();

