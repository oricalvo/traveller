import * as express from "express";
import * as path from "path";
import * as fs from "fs";

const app = express();
const basePath = path.join(__dirname, "..");
const port = 8001;

console.log("Running 4 express server");
console.log("    basePath: " + basePath);
console.log("    port: " + port);

app.use(express.static(basePath));

app.get("*", function(req, res, next) {
    const html = fs.readFileSync("index.html", "utf8");
    res.write(html);
    res.end();
});

app.listen(port, function () {
    console.log('App listening');
});