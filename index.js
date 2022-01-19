const express = require("express");
const app = express();

app.use(express.json())  

app.use('/posts', require('./routes/posts'));

app.listen(5000,()=>{
    console.log('servidor levantado en el puerto 5000')
})