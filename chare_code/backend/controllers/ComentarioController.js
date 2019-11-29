const Comentario=require('../models/comentario');

let getComentarios=(req,res)=>{
    Comentario.find()
     .populate('estudiante')
     .populate('post')
     .exec((err,comentarios)=>{
         if(err){
             res.status(500).send({
                 message:`Error ${err}`
             })
         }
         if(!comentarios){
            res.status(404).send({
                message:'No existen comentarios'
            })  
         }
         res.status(200).send({
             comentarios
         })
     })
}
let getComentario=(req,res)=>{
    let {id}=req.params;
    Comentario.findById(id,(err,comentario)=>{
        if(err){
            res.status(500).json({
                message:`Ocurrio un error ${err}`
            })
        }
        if(!comentario){
             res.status(404).json({
                 message:'No existe comentario'
             })
        }else{
            res.status(200).send({
                comentario
            })
        }
    })

}

let newComentario=(req,res)=>{
    let comentario=new Comentario({
        titulo:req.body.titulo,
        descripcion:req.body.descripcion,
        //id_estudiante
        estudiante:req.body.estudiante,
        //id_post
        post:req.body.post
        
    })
    comentario.save((err,comentario)=>{
         if(err){
             res.status(500).json({
                 message:`Ocurrio un error ${err}`
             })
         }else{
             res.status(200).json({
                 comentario
             })
         }
    })
}
let deleteComentario=(req,res)=>{
    let {id}=req.params;
    Comentario.findByIdAndDelete(id,(err)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }else{
            res.status(200).json({
                menssage:'El comentario ha sido eliminado con exito'
            })
        }
        // Comentario.deleteOne(err=>{
        //     if(err){
        //         res.status(500).send({
        //             message:`Error en el server ${err}`
        //         })
        //     }else{
        //         res.status(200).send({
        //             message:'El comentario ha sido eliminado con exito'
        //         })
        //     }
        // })
    })

};

let updateComentario=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Comentario.findByIdAndUpdate(id,update,{new:true},(err,comentarioUpdated)=>{
        if(err){
            res.status(500).json({
                ok:false,
                message:`Error al actualizar el autor ${err}`
            })
        }
        res.status(200).json({
            comentario:comentarioUpdated
        })
    })
}

module.exports={
    getComentarios,
    getComentario,
    newComentario,
    deleteComentario,
    updateComentario
}