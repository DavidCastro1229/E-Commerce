const express =require('express');
const morgan=require('morgan');
const cors=require('cors');
const path= require("path");
const cookieParse= require("cookie-parser")

const app=express();
const root = path.join(__dirname, '../client/public')
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(root));
app.use(cookieParse());
const rutas=require('./routes/rutas');
app.use(rutas);
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/index.html'))
})
console.log(root)
console.log(root+ "/index.html")
app.listen(process.env.PORT || 4000, ()=>console.log('server activo'));

