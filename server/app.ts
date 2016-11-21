import * as express from "express";
import * as path from "path";
import * as fs from "fs";

const app = express();
const basePath = path.join(__dirname, "..");
const port = 8001;

registerStaticHandler();
registerNotFound();
registerAlwaysReturnIndexHtml();

init();

function registerStaticHandler() {
    app.use(express.static(basePath));
}

function registerAlwaysReturnIndexHtml() {
    app.get("*", function (req, res, next) {
        const html = fs.readFileSync("index.html", "utf8");
        res.write(html);
        res.end();
    });
}

function registerNotFound(){
    app.use(function(req, res, next){
        if(req.url.indexOf(".")!=-1){
            res.status(404);
            res.end();
        }
        else{
            next();
        }
    });
}

function init() {
    console.log("Running express server");
    console.log("    basePath: " + basePath);
    console.log("    port: " + port);

    app.listen(port, function () {
        console.log('App listening');
    });
}