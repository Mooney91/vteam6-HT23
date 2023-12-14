<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const auth0 = useAuth0();

        return {
            user: auth0.user,
            isAuthenticated: auth0.isAuthenticated
        };
    }
}

</script>

<template>
    <div v-if="isAuthenticated">
        <div class="navigation">
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/account">Account History</RouterLink>
            <RouterLink to="/prepaid">Prepaid</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </div>
    </div>
</template>


<style>


</style>