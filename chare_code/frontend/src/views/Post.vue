<template>
  <div class="container">
    <form @submit.prevent="editarPost(postEditar)" v-if="editar">
     <h4 class="text-center">Edit Post</h4>
      <input type="text" class="form-control my-2" placeholder="Titulo" v-model='postEditar.titulo'>
      <textarea cols="30" rows="5" placeholder="Código_Fuente" 
        class="form-control my-2" v-model="postEditar.codigo_fuente">
        </textarea>
      <input type="text" class="form-control my-2" placeholder="Descripción" v-model="postEditar.descripcion">
      <input type="text" class="form-control my-2" placeholder="Estudiante_id" v-model="postEditar.estudiante">
      <button class="btn btn-dark sm my-2 mx-2" type='submit'>Editar</button>
      <button class="btn btn-danger sm my-2" type='submit' @click='editar=false'>Cancelar</button>
    </form>
    <!-- New Post -->
    <form @submit.prevent="newPost()" v-if="!editar">
     <h4 class="text-center">New Post</h4>
      <input type="text" class="form-control my-2" placeholder="Titulo" v-model='post.titulo'>
      <textarea cols="30" rows="5" placeholder="Código_Fuente" 
        class="form-control my-2" v-model="post.codigo_fuente">
        </textarea>
      <input type="text" class="form-control my-2" placeholder="Descripción" v-model="post.descripcion">
      <input type="text" class="form-control my-2" placeholder="Estudiante_id" v-model="post.estudiante">
      <button class="btn btn-success btn-block my-2" type='submit'>Agregar</button>
    </form>
    <div class="table-responsive">
    <table class="table">
      <thead>
         <tr>
           <th>Titulo</th>
           <th>Código_fuente</th>
           <th>Descripción</th>
           <th>Estudiante (_id)</th>
           <th>Opciones</th>
         </tr>
      </thead>
      <tbody>
        <tr v-for='(dato,index) of posts' :key='index'>
          <td>{{dato.titulo}}</td>
          <td>{{dato.codigo_fuente}}</td>
          <td>{{dato.descripcion}}</td>
          <td>
            {{dato.estudiante}} 
            <!-- {{dato.estudiante.apellido}}    
            {{dato.estudiante.apellido2}}     -->
          </td>
          <td>
            <button class="btn btn-danger btn-sm my-2 mx-2" @click='deletePost(dato._id)'>Eliminar</button>
            <button class="btn btn-warning btn-sm" @click='activarEdicion(dato._id)'>Editar</button>
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
      return {
        posts:[],
        post:{titulo:'',codigo_fuente:'',descripcion:'',estudiante:''},
        editar:false,
        postEditar:{}
      };
    },
    created(){
      this.mostrarPost();
    },
    methods:{
      mostrarPost(){
         this.axios.get('/posts')
          .then(res=>{
             this.posts=res.data.posts;
          })
          .catch((err)=>{
            console.log(`Ha ocurrido un error ${err}`)
          })
      },
      newPost(){
        this.axios.post('/post',this.post)
          .then(res=>{
              this.posts.push(res.data.post); 
              this.post.titulo='';
              this.post.codigo_fuente='';
              this.post.descripcion='';
              this.post.estudiante='';
          })
      },
      deletePost(id){
        //  console.log(id);
         this.axios.delete(`/post/${id}`)
          .then(res=>{
             const index= this.posts.findIndex(item=>item._id ===res.data._id);
            //  console.log(index);
             this.posts.splice(index,1);
          })
          .catch(err=>{
            console.log(err,res)
          })
      },
      activarEdicion(id){
          this.editar=true;
          console.log(id);
          this.axios.get(`/post/${id}`)
           .then(res=>{
              this.postEditar=res.data.post;
           })
           .catch(err=>{
              console.log(err.res)
           })
       },
       editarPost(item){
           this.axios.put(`/post/${item._id}`,item)
            .then(res=>{
               const index=this.posts.findIndex(mat=>mat._id === res.data.post._id);
                this.posts[index].titulo=res.data.post.titulo;
                this.posts[index].codigo_fuente=res.data.post.codigo_fuente;
                this.posts[index].descripcion=res.data.post.descripcion;
                this.posts[index].estudiante=res.data.post.estudiante;
                this.editar=false
            })
       }
    }    
}
</script>
