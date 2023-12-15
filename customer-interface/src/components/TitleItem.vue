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

<template>
    <div class="header">
        <div class="logo"> <img src="../assets/scooter-logo.png" alt="logo" width="25px"/></div>
        <h2 class="title">Customer Interface - Svenska Elsparkscyklar AB</h2>
        <!--<RouterLink to="/" class="login-button">Login</RouterLink>-->
        <div v-if="isAuthenticated">
        <button @click="logout" class="login-button">Logout</button>
        </div>
        <div v-else>
            <button @click="login" class="login-button">Login</button>
        </div>
    </div>

</template>
