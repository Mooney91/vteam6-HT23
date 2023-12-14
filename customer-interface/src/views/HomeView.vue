<script setup>

</script>

<template>
  <main>
    <h2>Welcome to the Customer Application!</h2>
    <div v-if="isAuthenticated">
      <h4> {{ user.email }}</h4>
      <h4> {{ user.name }}</h4>
      <h4> {{ user.picture }}</h4>
  </div>
  </main>
</template>

<script>

import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const auth0 = useAuth0();

        return {
            user: auth0.user,
            isAuthenticated: auth0.isAuthenticated
        };
    }
};
</script>