<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
          <p>
      <strong>User Token:</strong>
      {{ currentUser.token.substring(0, 20) }} ...
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    </header>
 </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import AuthService from '@/services/AuthService';
import Helper from '@/helpers/Helper';

const Auth = namespace("Auth");

@Component
export default class Profile extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    
  }
  checkToken()
  {
    AuthService.checkToken().then((response) => {
      console.log(response);
    }).catch((error) => {
      if(error.response.status == 401) {
          Helper.regenerateToken();
        }
        console.log(error);
    });
  }


}
</script>
