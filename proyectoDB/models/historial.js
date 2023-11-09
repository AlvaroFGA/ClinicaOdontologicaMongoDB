const mongoose = require('mongoose');
const Schema = mongoose.Schema
/*const pacienteSchema = new Schema({
   nombre: String,
   apellido: String,
   ciudad: String,
   telefono: String,
   email: String
 });*/
 const historialSchema = new Schema({
    fecha: Date,
    doctor: String,
   paciente: {
    nombre: String,
    apellido: String,
    ciudad: String,
    telefono: String,
    email: String
   }, 
   tratamiento: String   
 });
 const Historial = mongoose.model('clinica', historialSchema);
 module.exports = Historial;