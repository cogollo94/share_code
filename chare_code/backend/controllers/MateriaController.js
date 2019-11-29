const Materia=require('../models/materia');

let getMaterias=(req,res)=>{
    Materia.find({},(err,materias)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }
        if(!materias){
           res.status(404).send({
               message:'No existen materias'
           })  
        }
        res.status(200).send({
            materias
        })
    })
}
let getMateria=(req,res)=>{
    let {id}=req.params;
    Materia.findById(id,(err,materia)=>{
        if(err){
            res.status(500).json({
                message:`Error al mostrar la materia ${err}`
            })
        }
        if(!materia){
            res.status(404).json({
                message:'No existe la materia'
            })
        }
        res.status(200).send({
            materia
        })
    })
}

let newMateria=async (req,res)=>{
    let materia=new Materia({
        nombre:req.body.nombre,
        descripcion:req.body.descripcion
    })
    materia.save((err,materia)=>{
        if(err){
            res.status(500).send({
                message:`Ocurrio un error ${err}`
            })
        }else{
            res.status(200).send({materia})
        }
    })
}
let deleteMateria=(req,res)=>{
    let {id}=req.params;
    Materia.findByIdAndDelete(id,(err)=>{
        if (err) {
            res.status(500).send({
                message: `Error ${err}`
            })
        } else {
            res.status(200).send({
                message: 'La materia ha sido eliminada con exito'
            })
        }
    })   

};

let updateMateria=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Materia.findByIdAndUpdate(id,update,{new:true},(err,materiaUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar la materia ${err}`
            })
        }
        res.status(200).json({
            materia:materiaUpdated
        })
    })
}

module.exports={
    getMaterias,
    getMateria,
    newMateria,
    deleteMateria,
    updateMateria
}