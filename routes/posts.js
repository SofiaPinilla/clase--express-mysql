const express = require("express");
const router = express.Router();
const db = require('../config/database')

router.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE expressDB';
    db.query(sql,(err,result)=>{
      if(err)throw err;
      console.log(result);
      res.send('Database created...')
    })
  })  

router.get('/createtable',(req,res)=>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
      db.query(sql,(err,result)=> {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...')
      })
    })

router.post('/',(req,res)=>{
        let post = {title:req.body.title, body:req.body.body};
        let sql = 'INSERT INTO posts SET ?'
        db.query(sql,post,(err,result)=> {
          if(err) throw err;
          console.log(result);
          res.send('Post added...')
        })
      })

router.get('/',(req,res)=> {
        let sql = 'SELECT * FROM posts';
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      })

router.get('/id/:id',(req,res)=>{
        let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          if(result.length == 0){
              res.send('Post no encontrado')
          }
          res.send(result)
        })
      })

router.put('/id/:id',(req,res)=>{
        let newTitle = req.body.title;
        let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Post updated...')
        })
      })
      
router.delete('/:id',(req,res)=>{
        let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Post deleted')
        })
      })

      module.exports = router;