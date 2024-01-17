<script>
import { RouterLink } from 'vue-router'
// import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        // const auth0 = useAuth0();

        // return {
        //     login() {
        //         auth0.loginWithRedirect();
        //     },
        //     logout() {
        //         auth0.logout();
        //     },
        //     user: auth0.user,
        //     isAuthenticated: auth0.isAuthenticated
        // };
    }
};
// <RouterLink to="/login" class="login-button">Login</RouterLink>
</script>

<template>
    <div class="header">
        
        <RouterLink to="/">
            <img alt="scooter logo" class="logo" src="@/assets/scooter-logo.png" width="25" height="25" />
        </RouterLink>
        <h2 class="title">Admin Interface - Svenska Elsparkscyklar AB</h2>
        
        <!-- <template v-if="isAuthenticated">
        <div @click="logout" class="login-button">Logout</div>
        </template>
        <template v-else>
            <div @click="login" class="login-button">Login</div>
        </template> -->

    </div>
</template>

<style>
</style>