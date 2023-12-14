

<template>
    <div v-if="isAuthenticated">
        <button @click="logout">Logout</button>
        <h4> {{ user.email }}</h4>
        <h4> {{ user.name }}</h4>
        <h4> {{ user.picture }}</h4>
    </div>
    <div v-else>
        <button @click="login">Login</button>
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