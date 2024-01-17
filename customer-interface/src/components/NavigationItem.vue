<script>
//import { RouterLink } from 'vue-router'
//import { useAuth0 } from '@auth0/auth0-vue';


export default {
    data() {
        return {
            user: this.$auth0.user,
            isAuthenticated: this.$auth0.isAuthenticated
        };
    }
}

</script>

<template>
    <div v-if="isAuthenticated" class="navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/account">Account</RouterLink>
        <RouterLink to="/users">All Users</RouterLink>
        <RouterLink to="/travel">Travel History</RouterLink>
        <RouterLink to="/payment">Payment</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </div>
</template>


<style>


</style>