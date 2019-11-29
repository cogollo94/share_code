const Post=require('../models/post');

let getPosts=(req,res)=>{
    Post.find()
    .populate('estudiante')
    //    .populate('estudiante','nombre')
     .exec((err,posts)=>{
            if(err){
                res.status(500).send({
                    message:`Error ${err}`
                })
            }
            if(!posts){
               res.status(404).send({
                   message:'No existen posts'
               })  
            }
            res.status(200).send({
                posts
            })
     })
}
// let getPost=async (req,res)=>{
//     const post=await Post.findById(req.params.id);
//     res.json(post);
// }
let getPost=(req,res)=>{
    let {id}=req.params;
    Post.findById(id,(err,post)=>{
        if(err){
            res.status(500).json({
                message:`Error al mostrar el post ${err}`
            })
        }
        if(!post){
            res.status(404).json({
                message:'No existe la materia'
            })
        }else{
            res.status(200).send({
                post
            })
        }
    })
    
}

let newPost=(req,res)=>{
    const post=new Post({
        titulo:req.body.titulo,
        // codigo_err:req.body.codigo_err,
        codigo_fuente:req.body.codigo_fuente,
        descripcion:req.body.descripcion,
        estudiante:req.body.estudiante 
    })
    post.save((err,post)=>{
        if(err){
            res.status(500).send({
                menssage:`Ocurrio un error ${err}`
            })
        }else{
            res.status(200).send({
                post
            })
        }
    })
}
let deletePost=(req,res)=>{
    let {id}=req.params;
    Post.findByIdAndDelete(id,(err)=>{
        if(err){
            res.status(500).send({
                message:`Error ${err}`
            })
        }else{
            res.status(200).json({
                message: 'El post ha sido eliminado con exito'
            })
        }
        // Post.deleteOne(err=>{
        //     if(err){
        //         res.status(500).send({
        //             message:`Error en el server ${err}`
        //         })
        //     }else{
        //         res.status(200).send({
        //             message:'El post ha sido eliminado con exito'
        //         })
        //     }
        // })
    })

};

let updatePost=(req,res)=>{
    let {id}=req.params;
    let update=req.body;
    Post.findByIdAndUpdate(id,update,{new:true},(err,postUpdated)=>{
        if(err){ 
            res.status(500).json({
                ok:false,
                message:`Error al actualizar el post ${err}`
            })
        }
        res.status(200).json({
            post:postUpdated
        })
    })
}

module.exports={
    getPosts,
    getPost,
    newPost,
    deletePost,
    updatePost
}