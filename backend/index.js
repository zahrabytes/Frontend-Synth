import express from "express"
import mysql from "mysql2"
import bcrypt from 'bcrypt';

const app = express()


// connection to database
const db = mysql.createConnection({
    host: "database-group-12.cxyime46mesp.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "mysqlpass",
    database: "coogtunes",
    port: "3306"
})


app.get("/", (req,res) =>{
    res.json("This is the main page")

})

app.get("/login", (req,res) =>{
    res.json("User Login")
})

app.post('/users', async (req,res) => {
    
})

function logger(req,res, next) {
    console.log('Log');
    next();
}



 //Sending specific data to database
 /*
const albumData = {
    artistName: 'Chase',
    email: 'jonaepic@gmail.com',
    password: 'Odie1010!',
    dob: '2022-01-01',
  };
*/

/* Sending Test Data
const query = 'INSERT INTO artist (artistName,email,password,DoB) VALUES (?,?,?,?)';
const values = [albumData.artistName, albumData.email, albumData.password,albumData.dob];
  db.query(query, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting data:', error);
      return;
    }
    console.log('Data inserted successfully');
  });

*/



 //From Tutorial, Get Results from DB
/*
app.get("/Chase", (req,res) =>{
    const q = "SELECT * FROM artist;"
    db.query(q,(err,data) =>{
        if (err) return res.json(err)
        return res.json(data)
    })
})
*/

/* From tutorial
app.post("/books", (req,res) => {
    const q = "INSERT INTO book ('title,'desc','cover) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q,[values], (err,data) => {
        if (err) return res.json (err)
        return res.json("Book has been created successfully")
    })
})
*/


app.listen(8800, () => {
    console.log("Connected to backend!")
})





