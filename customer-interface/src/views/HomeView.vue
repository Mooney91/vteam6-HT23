<script setup>

</script>

<template>
    <div v-if="isLoading">Loading...</div>

    <div v-if="isAuthenticated">
      <h2>Welcome {{ user.name }}!</h2>
    </div>
    <div v-else>
      <h2>Welcome Customer!</h2>
      <h3>Use the login button to gain access to the application!</h3>
    </div>

    <h3 v-if="token">Token: {{ token }}</h3>
    <div v-if="token">
      <h3>Token: {{ token }}</h3>
    </div>

</template>


<script>
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isAuthenticated: this.$auth0.isAuthenticated,
      user: this.$auth0.user,
      isLoading: this.$auth0.isLoading,
      token: Cookies.get("tokenStructure")
    };
  }
}

</script>
