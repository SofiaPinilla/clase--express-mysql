const express = require("express");
const app = express();
const mysql = require('mysql2');

app.use(express.json())

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database:'expressDB'
});

db.connect();

app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE expressDB';
    db.query(sql,(err,result)=>{
      if(err)throw err;
      console.log(result);
      res.send('Database created...')
    })
  })  

app.get('/createtable',(req,res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
      db.query(sql,(err,result)=> {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...')
      })
    })

app.post('/',(req,res)=>{
        let post = {title:req.body.title, body:req.body.body};
        let sql = 'INSERT INTO posts SET ?'
        db.query(sql,post,(err,result)=> {
          if(err) throw err;
          console.log(result);
          res.send('Post added...')
        })
      })

app.get('/',(req,res)=> {
        let sql = 'SELECT * FROM posts';
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      })

app.get('/id/:id',(req,res)=>{
        let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          if(result.length == 0){
              res.send('Post no encontrado')
          }
          res.send(result)
        })
      })

app.put('/id/:id',(req,res)=>{
        let newTitle = req.body.title;
        let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Post updated...')
        })
      })
      
app.delete('/:id',(req,res)=>{
        let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Post deleted')
        })
      })
      
      
      
app.listen(5000,()=>{
    console.log('servidor levantado en el puerto 5000')
})