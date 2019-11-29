<template>
  <div class="container">
    <form @submit.prevent="editarComentario(comentarioEditar)" v-if="editar">
       <h3>Edit Comentario</h3>
       <input type="text" class="form-control my-2" v-model="comentarioEditar.titulo" placeholder="Titulo"/>
       <input type="text" class="form-control my-2" v-model="comentarioEditar.descripcion" placeholder="Descripción"/>
       <input type="text" class="form-control my-2" v-model="comentarioEditar.estudiante" placeholder="Estudiante_id"/>
       <input type="text" class="form-control my-2" v-model="comentarioEditar.post" placeholder="Post_id"/>
       <button class="btn btn-success sm my-2 mx-2" type="submit">Editar</button>
       <button class="btn btn-danger sm my-2" type="submit" @click="editar=false">Cancelar</button>
    </form>
    <form @submit.prevent="newComentario()" v-if="!editar">
       <h3>New Comentario</h3>
       <input type="text" class="form-control my-2" v-model="comentario.titulo" placeholder="Titulo"/>
       <input type="text" class="form-control my-2" v-model="comentario.descripcion" placeholder="Descripción"/>
       <input type="text" class="form-control my-2" v-model="comentario.estudiante" placeholder="Estudiante_id"/>
       <input type="text" class="form-control my-2" v-model="comentario.post" placeholder="Post_id"/>
       <button class="btn btn-success mx-2 my-2" type="submit">Agregar</button>
    </form>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Estudiante</th>
            <th>Post</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
           <tr v-for="(item,index) of comentarios" :key='index'>
              <td>{{item.titulo}}</td>
              <td>{{item.descripcion}}</td>
              <td>
                {{item.estudiante.nombre}}
                <!-- {{item.estudiante.nombre}}
                {{item.estudiante.apellido}}
                {{item.estudiante.apellido2}} -->
              </td>
              <td>  
                {{item.post}}
                <!-- {{item.post.titulo}} -->
              </td>
              <!-- <td>
                {{item.estudiante.nombre}}
                {{item.estudiante.apellido}}
                {{item.estudiante.apellido2}}
              </td> -->
              <td>
                <button class="btn btn-danger btn-sm my-2 mx-2" @click='Delete_comentario(item._id)'>Delete</button>
                <button class="btn btn-warning" @click="activarEdicion(item._id)">Edit</button>
              </td>
           </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
   data(){
     return{
        comentarios:[],
        comentario:{titulo:'',descripcion:'',estudiante:'',post:''},
        editar:false,
        comentarioEditar:{}
     }
   },
   created(){
     this.mostrar_comentarios()
   },
   methods:{
      mostrar_comentarios(){
         this.axios.get('/comentarios')
          .then(res=>{
             this.comentarios=res.data.comentarios
          })
          .catch(err=>{
            console.log(err);
          })
      },
      newComentario(){
        //  console.log(this.comentario);
        this.axios.post('/comentario',this.comentario)
         .then(res=>{
            this.comentarios.push(res.data.comentario);
            this.comentario.titulo='';
            this.comentario.descripcion='';
            this.comentario.estudiante='';
            this.comentario.post='';
         })
         .catch(err=>{
           console.log(err.res)
         })
      },
      Delete_comentario(id){ 
         console.log(id);
         this.axios.delete(`/comentario/${id}`)
          .then(res=>{
             const index=this.comentarios.findIndex(coment=>coment._id===res.data._id);
             this.comentarios.splice(index,1);
          })
          .catch(err=>{
            console.log(`Ocurrio un error ${err}`);
          })
      },
      activarEdicion(id){
        this.editar=true;
        console.log(id);
        this.axios.get(`/comentario/${id}`)
          .then(res=>{
             this.comentarioEditar=res.data.comentario;
          })
          .catch(err=>{
             console.log(err.res);
          })
      },
      editarComentario(item){
          this.axios.put(`/comentario/${item._id}`,item)
            .then(res=>{
               const index=this.comentarios.findIndex(coment=>coment._id === res.data.comentario._id);
                this.comentarios[index].titulo=res.data.comentario.titulo;
                this.comentarios[index].descripcion=res.data.comentario.descripcion;
                this.comentarios[index].estudiante=res.data.comentario.estudiante;
                this.comentarios[index].post=res.data.comentario.post;
                this.editar=false
            })
      }
   }
};
</script>
<style></style>