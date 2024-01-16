<style>

</style>


<template>
    <div v-if="isLoading">Logging out..</div>
    <div v-else>
        <h3>Logout successful!</h3>
    </div>
</template>


<script>
    import { useAuth0 } from '@auth0/auth0-vue'

    export default {
        setup() {
            const { isLoading } = useAuth0();

            return {
                isLoading,
            };
        },
    };
</script>
