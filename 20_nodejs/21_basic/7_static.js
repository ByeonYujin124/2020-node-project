const http = require("http");
const path = require("path");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

//127.0.0.1:3000/dog.jpg
const server = http.createServer((req, res) => {
    const obj = path.parse(req.url);
    const filename = obj.base; //dog.jpg
    // C:\NodeProject\20_nodes\images\dog.jpg
    const imagePath = '${__dirname}${path.sep}images${path.sep}${filename}';

    fs.readFile(imagePath, (err, data) => {
        if(err){
            res.statusCode = 404;
            res.end("Not Found");
            return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end();
    });
});