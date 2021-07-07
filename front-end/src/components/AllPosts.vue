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
  import Helper from '@/helpers/Helper';

  const Auth = namespace("Auth");

  @Component
  export default class AllPosts extends Vue {

    @Auth.State("user")
    private currentUser!: any;
    private posts = [];
   
    created() {
      if (!this.currentUser) {
        this.$router.push("/login");
      }
      this.getUserPosts();
      this.getAllPosts();

    };
    save(id: number){
    PostService.savePost(id, this.currentUser.email).then((response) => {
      this.removePosts(id);
      }).catch((error) => {
         if(error.response.status == 401) {
            Helper.regenerateToken();
            }
          console.log(error);
      })


     };
     getAllPosts(){
      PostService.getAllPosts().then((response) => {
          this.posts = response.data;
        }).catch((error) => {
         if(error.response.status == 401) {
              Helper.regenerateToken();
            }
          console.log(error);
          });
     };

     getUserPosts(){
        PostService.getAllUserPosts(this.currentUser.email).then((response) => {
         console.log('Succesfful posts users get data:', response.data.posts);
         this.filterPosts(response.data.posts);
         }).catch((error) => {
          if(error.response.status == 401) {
            Helper.regenerateToken();
            }
            console.log(error);
             });
      
     };
     filterPosts(userPosts: Array<number>){
       type post = {
        id: number,
        title: string,
        userId: number
      }
     const  posts = this.posts
      posts.filter( (item: post) =>  {
        console.log('filter function posts')
        return !userPosts.includes(item.id) });
     }
     removePosts(id: number){
       this.posts = this.posts.filter( (item:any) =>  item.id !== id );
     }
  }
</script>