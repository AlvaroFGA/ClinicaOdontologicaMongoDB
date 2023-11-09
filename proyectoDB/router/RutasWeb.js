const express = require('express');
const router = express.Router();

const Historial = require('../models/historial')

router.get('/', async (req, res) => {
   try {
      const arrayHistorialDB = await Historial.find()
      console.log(arrayHistorialDB)
      res.render("historiales",{
         arrayHistorial: arrayHistorialDB
      });
   } catch (error) {
     console.log(error) 
   }
 });
 router.get('/crear', (req, res) => {
   res.render('crear')
})
router.post('/', async (req, res) => {
   const body = req.body
   console.log(body)
   try {
       const historialDB = new Historial(body)
       await historialDB.save()
       res.redirect('/')
   } catch (error) {
       console.log('error', error)
   }
})
router.get('/:id', async(req, res) => {
   const id = req.params.id
   try {
       const historialDB = await Historial.findOne({ _id: id })
       console.log(historialDB)
       res.render('detalle', {
           historial: historialDB,
           error: false
       })
   } catch (error) {
       console.log('erroooooooooorrr', error)
       res.render('detalle', {
           error: true,
           mensaje: 'No se encuentra el documento...'
       })
   }
})

router.put('/:id', async(req, res)=>{
   const id = req.params.id
   const body = req.body
   try {
       const historialDB = await Historial.findByIdAndUpdate(
           id, body,{ useFindAndModify: false})
           console.log(historialDB)
           res.json({
               estado: true,
               mensaje: 'editado'
           })
   } catch (error) {
       console.log(error)
       res.json({
           estado: false,
           mensaje: 'fallo'
       })
   }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        const historialDB = await Historial.findByIdAndDelete({ _id: id });
        console.log(historialDB)
        if (!historialDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }
    } catch (error) {
        console.log(error)
    }
 })
 module.exports = router;