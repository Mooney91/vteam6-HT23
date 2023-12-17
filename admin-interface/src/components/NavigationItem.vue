<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="navigation">
        <RouterLink to="/map"><img src="@/assets/map-location-dot-solid.svg" class="map-icon"></RouterLink>
        <RouterLink to="/city">Cities</RouterLink>
        <RouterLink to="/scooter">Scooters</RouterLink>
        <RouterLink to="/charging">Charging Stations</RouterLink>
        <RouterLink to="/parking">Parking</RouterLink>
        <RouterLink to="/rental">Rental Logs</RouterLink>
        <RouterLink to="/user">Users</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
    </div>
</template>

<style>
</style>