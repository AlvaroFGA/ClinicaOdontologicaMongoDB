const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000

const mongoose = require('mongoose');
const usuario = "alvaro_99"
const password = "fredgonz2104"
const dbName = "ProyectoDB"
const uri = `mongodb+srv://${usuario}:${password}@cluster0.yl3o440.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"))

app.use('/', require('./router/RutasWeb'))

app.listen(port, ()=>{
   console.log('servidor');
})