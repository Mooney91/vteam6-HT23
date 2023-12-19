<script>
import { RouterLink, RouterView } from 'vue-router'

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
// <RouterLink to="/login" class="login-button">Login</RouterLink>
</script>

<template>
    <div class="header">
        <img alt="scooter logo" class="logo" src="@/assets/scooter-logo.png" width="25" height="25" />
        <h2 class="title">Admin Interface - Svenska Elsparkscyklar AB</h2>
        <div v-if="isAuthenticated">
        <button @click="logout" class="login-button">Logout</button>
        </div>
        <div v-else>
            <button @click="login" class="login-button">Login</button>
        </div>
    </div>
</template>

<style>
</style>