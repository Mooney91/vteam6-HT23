<!--
<script setup>
import HomeItem from '../components/HomeItem.vue'
</script>

<template>
  <main>
    <HomeItem />
  </main>
</template>
-->

<template>
  <div v-if="isAuthenticated">
      <h1>Welcome {{ user.name }}!</h1>
      <p>This is the administrative interface (admin panel) for <i>Svenska Elsparkscyklar AB</i>.</p>
      <p>Here you can view and manage data in the system.</p>
  </div>
  <div v-else>
      <h1>Welcome!</h1>
      <h2>Use the login button to gain access to the application!</h2>
      <p>This is the administrative interface (admin panel) for <i>Svenska Elsparkscyklar AB</i>.</p>
      <p>Here you can view and manage data in the system.</p>
  </div>
</template>

<script>
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
      setup() {
          const auth0 = useAuth0();

          return {
              login() {
                  auth0.loginWithRedirect();
              },
              logout() {
                  auth0.logout();
              },
              user: auth0.user,
              isAuthenticated: auth0.isAuthenticated
          };
      }
  };
</script>
