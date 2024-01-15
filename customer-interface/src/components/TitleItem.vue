<script>

//import { useAuth0 } from '@auth0/auth0-vue';


export default {
    methods: {
        login() {
            this.$auth0.loginWithRedirect();
        },
        /*
        logout() {
            this.$auth0.logout();
        },*/
        logout() {
            this.$auth0.logout({ logoutParams: "http://localhost:1339/logout" });
        }
    },
    data: function () {
        return {
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated
        };
    }

};




</script>

<template>
    <div class="header">
        <div class="logo"> <img src="../assets/scooter-logo.png" alt="logo" width="25px"/></div>
        <h2 class="title">Customer Interface - Svenska Elsparkscyklar AB</h2>
        <div v-if="isAuthenticated">
        <button @click="logout" class="login-button">Logout</button>
        </div>
        <div v-else>
            <button @click="login" class="login-button">Login</button>
        </div>
    </div>

</template>
