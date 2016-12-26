import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as request from "request";

const app = express();
const basePath = path.join(__dirname, "..");
const port = 8001;

registerPassThrough("/api", "http://localhost:8080/api");
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

function registerPassThrough(baseUrl, externalUrl){
    app.use(baseUrl + "*", function(req, res){
        var url = req.originalUrl;
        console.log("URL: " + url);
        var tail = url.substring(baseUrl.length);
        var redirectUrl =  externalUrl + tail;

        console.log("REDIRECTING: " + req.url + " --> " + redirectUrl);

        req.pipe(request(redirectUrl, function(error, response, body) {
            if(error) {
                console.error("ERROR: " + error.message);

                res.status(500).send("Redirect to " + externalUrl + " failed with error: " + error.message);
            }
        })).pipe(res);
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