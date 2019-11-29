const express=require('express');
const materiaController=require('../controllers/MateriaController');
const router=express.Router();

router.get('/materias',materiaController.getMaterias);
router.get('/materia/:id',materiaController.getMateria);
router.post('/materia',materiaController.newMateria);
router.delete('/materia/:id',materiaController.deleteMateria);
router.put('/materia/:id',materiaController.updateMateria);
module.exports=router;