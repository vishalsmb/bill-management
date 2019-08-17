const express = require('express');
const fs = require('fs');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser')
const port = process.env.port || process.env.PORT || 3000;
var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port : "3306",
  database : process.env.DATABASE
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to RDS database ! :::: " + new Date().toISOString());
});

app.use(bodyParser.json()); //For supporting JSON encoded bodies
app.use(bodyParser.urlencoded({
    extended:true
}));                        //For supporting URL encoded bodies
app.use(express.static(__dirname + "/static"));

app.get('/',function(req,res){
    fs.readFile(__dirname+'/static/html/index.html',function(err,data){
        res.write(data);
        res.end();
    })
})

app.post('/api/submitExpense', function(req,res){
    var sql = `INSERT INTO daily_expenses (expenseDate,amount,category,comments) VALUES (${'"'+req.body.date+'"'}, ${'"'+req.body.amount+'"'}, ${'"'+req.body.category+'"'}, ${'"'+req.body.comments+'"'})`;
    con.query(sql, function (err, result) {
      if (err) {
        throw err;
        res.end();
      }
      console.log("Data inserted into the table successfully ! :::: " + new Date().toISOString());
      res.end("inserted");
    });
})

app.get('/api/analytics/getExpenseCurrentMonth', function(req,res){
    var sql = `SELECT * FROM daily_expenses`;
    con.query(sql, function (err, result, fields) {
        if (err) {
            throw err;
            res.end();
        }
        res.end(JSON.stringify(result));
    });
})

app.listen(port, () => {
    console.log("App listening on port "+port);
})