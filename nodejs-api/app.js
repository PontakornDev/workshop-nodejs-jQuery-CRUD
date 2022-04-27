const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = require('express-myconnection')
const cors = require('cors');
const body = require('body-parser');

require('dotenv').config()

const PORT = process.env.PORT;

app.use(body.urlencoded({ extended: true }));
app.use(cors())
app.use(connection(mysql, {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: 3306,
    database: process.env.DATABASE_NAME
  }, 'single'));

app.get('/api/users', (req, res) => {
    req.getConnection((_, conn) => {
        conn.query('SELECT * FROM users', (err, data) => {
            if(err){
                res.json(err)
            }else{
                res.send(data)
            }
        });
    });
})

app.post('/api/add/users', (req, res) => {
    const data = req.body
    req.getConnection((_, conn) => {
        conn.query('INSERT INTO users SET name =? , last_name=?',[data.name,data.lastname], (err, data) => {
            if(err){
                res.json(err)
            }else{
                res.send(data)
            }
        });
    });
})

app.put('/api/update/users', (req, res) => {
    const data = req.body
    req.getConnection((_, conn) => {
        conn.query('UPDATE users SET name =? , last_name=? WHERE idusers=?',[data.name,data.last_name,data.id], (err, data) => {
            if(err){
                res.json(err)
            }else{
                res.send(data)
            }
        });
    });
})

app.delete('/api/delete/users', (req, res) => {
    const data = req.body
    req.getConnection((_, conn) => {
        conn.query('DELETE FROM users WHERE idusers=?',[data.id], (err, data) => {
            if(err){
                res.json(err)
            }else{
                res.send(data)
            }
        });
    });
})


app.listen(PORT, () => console.log(`Server Listen PORT ${PORT}`));