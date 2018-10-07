const express = require("express");
const fs = require("fs");
const app = express();
const csv = require('csv-parser')
const cors = require('cors');
const config = require("./config")
const dat = []

app.use(express.static(__dirname + '/public'));

if (dat != null && dat.length === 0) {
    fs.createReadStream(config["csvDump"])
        .pipe(csv())
        .on('data', function (row) {
            dat.push(row)
        })
        .on('end', function () {
            console.log('Data loading over. Data Count::', dat.length)
        })
}



app.get("/", (req, res) => {
    fs.readFile('./index.html', (err, file) => {
        if (err) {
            throw err;
        }
        res.writeHeader(200, {
            "Content-Type": "text/html"
        });
        res.write(file);
        res.end();
    })
})

app.get("/tedTalks", (req, res) => {
    res.json(dat);
})


app.get("/tedTalks/sortView", cors(), (req, res, next) => {
    dat.sort(function (a, b) {
        return parseInt(a.views) - parseInt(b.views);
    });
    let t = {};
    var rArr = [];
    for (let y = 0; y < 10; y++) {
        console.log(dat[y].views)
        t[y] = dat[y];
    }
    res.json(t);
})

app.get("/tedTalks/:from/:to", cors(), (req, res, next) => {
    if (req.params.from < req.params.to) {
        let t = {};
        var rArr = [];
        for (let y = req.params.from; y < req.params.to; y++) {
            t[y] = dat[y];
        }
        res.json(t);
    } else {
        res.end("Please refresh the page")
    }
})

app.listen(3000, () => {
    console.log("Server is up and running")
})