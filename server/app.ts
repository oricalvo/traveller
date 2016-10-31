import * as express from "express";
import * as path from "path";

const app = express();
const basePath = path.join(process.cwd(), "..");
const port = 8001;

console.log("Running 4 express server");
console.log("    basePath: " + basePath);
console.log("    port: " + port);

app.use(express.static(basePath));

app.listen(port, function () {
    console.log('App listening');
});