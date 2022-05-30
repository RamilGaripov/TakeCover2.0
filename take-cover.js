const express = require("express");
const app = express();
const fs = require("fs");
const mysql = require("mysql2");

var connection = null;

const localDBcreateConfig = {
    host: "localhost",
    user: "root",
    password: "",
    multipleStatements: true
}

const localDBconfig = {
    host: "localhost",
     user: "root",
     password: "",
     database: "TakeCover"
}

connection = mysql.createPool(localDBconfig);

app.use("/css", express.static("./public/css"));
app.use("/js", express.static("./public/script"));
app.use("/img", express.static("./public/img"));
app.use("/html", express.static("./app/html"));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
    //if the user is logged in, it'll redirect them to their main page
    let doc = fs.readFileSync("./app/index.html", "utf8");
    res.set("Server", "RabbitServer"); //Random server name I came up with. When hosting a website on an actual server, you'd put their name here.
    res.set("Powered-By", "0.1xHorsePower"); //Same as line above.
    res.send(doc);

});

app.get("/get-leaderboard", (req, res) => {
    connection.query("SELECT * FROM Leaderboard ORDER BY score DESC LIMIT 10;", (err, results) => {
        if (err) {
            res.send({status: "fail"});
        } else {
            res.send({status: "success", rows: results});
        }
    })
});

app.post("/insert-score", function(req, res) {
    console.log("user finished the game");
    // console.log(req.body.data);
    console.log("name", req.body.name, "score", req.body.score);
    connection.query("INSERT INTO Leaderboard(name, score) VALUES ('" + req.body.name + "', '" + req.body.score + "')", (err, results) => {
        if (err) {
            res.send({status: "fail", msg: "Sorry, we were unable to upload your score at this time."});
        } else {
            res.send({status: "success", msg: "Score uploaded."});
        }
    });
});

async function init() {
    const mysqlpromise = require("mysql2/promise");
    console.log("Listening on port 8000!");
    const connectionInit = await mysqlpromise.createConnection(localDBcreateConfig);
    var createDBandTables = `CREATE DATABASE IF NOT EXISTS TakeCover;
    USE TakeCover;
    CREATE TABLE IF NOT EXISTS Leaderboard(
        play_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) DEFAULT "HalfBubbles",
        score INT NOT NULL
    );`
    await connectionInit.query(createDBandTables);
    
    const [rows, records_fields] = await connectionInit.query("SELECT * FROM Leaderboard");
    // console.log("THE FIELDS", rows);
    // adds records if there are currently none
    if (rows.length == 0) {
      
    var sql = `INSERT INTO Leaderboard(name, score) VALUES ?`; 
    var fakeRecords = [
    ["MoonMeander", "25"], 
    ["bkid", "23"], 
    ["m'ICKe", "23"], 
    ["FuzzySloth", "22"],
    ["LivingWeapon", "20"],
    ["BubblesBot", "10"],
    ["EngineerBot", "8"],
    ["SlitherBot", "6"],
    ["HammerstormBot", "4"],
    ["PredatorBot", "2"],
    ];
    await connectionInit.query(sql, [fakeRecords]);
    }
    

  

    connection = mysql.createPool(localDBconfig);
}

app.listen(8000, init);