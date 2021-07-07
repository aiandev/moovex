<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Posts</h2>
      <div class="container">
        <div class="row">
          <div class="card m-4" style="width: 18rem;" v-for="post in posts" v-bind:key="post.id">
            <div class="card-body">
              <h5 class="card-title">{{post.title}}</h5>
              <p class="card-text">{{post.body}}</p>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" @click.stop="save(post.id)">Save</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from "vue-property-decorator";
  import PostService from '@/services/PostService';
  import {
    namespace
  } from "vuex-class";
  const Auth = namespace("Auth");

  @Component
  export default class AllPosts extends Vue {

    @Auth.State("user")
    private currentUser!: any;
    private posts = [];


    
    mounted() {
      if (!this.currentUser) {
        this.$router.push("/login");
      }
      PostService.getAllPosts().then(
        (response) => {
          this.posts = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    };
    save(id: number){

      PostService.savePost(id, this.currentUser.email).then((response) => {
        console.log(response.data);
      this.removePosts(id);
      }).catch((error) => {
        console.log(error);
      })


     };
     filterPosts(){
       
     }
     removePosts(id: number){
       this.posts = this.posts.filter( (item:any) => {return item.id !== id} );
     }
  }
</script>
