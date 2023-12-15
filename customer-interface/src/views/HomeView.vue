<script setup>

</script>

<template>
    <div v-if="isAuthenticated">
      <h2>Welcome {{ user.name }}!</h2>
    </div>
    <div v-else>
      <h2>Welcome Customer!</h2>
      <h3>Use the login button to gain access to the application!</h3>
    </div>
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