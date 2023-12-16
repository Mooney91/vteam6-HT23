<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="header">
        <img alt="scooter logo" class="logo" src="@/assets/scooter-logo.png" width="25" height="25" />
        <h2 class="title">Admin Interface - Svenska Elsparkscyklar AB</h2>
        <RouterLink to="/login" class="login-button">Login</RouterLink>
    </div>
</template>


<style>


</style>