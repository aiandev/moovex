<template>
  <div class="container">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(post, index) in posts" v-bind:key="index"> 
      <th scope="row">{{post}}</th>
      <td><button type="button" class="btn btn-danger" @click.stop="deletePost(post)">Remove Post</button></td>
    </tr>

  </tbody>
</table>
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
export default class MyPosts extends Vue {
    @Auth.State("user")
    private currentUser!: any;
    private posts = [];
    created() {
      if (!this.currentUser) {
        this.$router.push("/login");
      }
      this.getUserPosts();

    };
     getUserPosts(){
        PostService.getAllUserPosts(this.currentUser.email).then((response) => {
         this.posts = response.data.posts;
         }).catch((error) => {
          if(error.response.status == 401) {
          Helper.regenerateToken();
          }
         console.log(error);
       })
    };
    deletePost(id: number){
      let email: string = this.currentUser.email;
      PostService.removePost(id, email).then((response) => {
        alert('Post is removed');
        this.removePost(id);
      }).catch((error) => {
        console.log(error);
        if(error.response.status == 401) {
          Helper.regenerateToken();
        }
       alert(error);
      });
    };
    removePost(id: number){
      this.posts = this.posts.filter( (post:any) =>  post !== id );
    };
}
</script>
