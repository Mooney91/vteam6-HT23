<script>
import { RouterLink } from 'vue-router'
// import { useAuth0 } from '@auth0/auth0-vue';

export default {
  components: {
    RouterLink
  },
  setup() {
    // const auth0 = useAuth0();
    // return {
    //     user: auth0.user,
    //     isAuthenticated: auth0.isAuthenticated
    // };
  }
}
</script>

<template>
  <div class="navigation">
    <!-- <div v-if="isAuthenticated"> -->
    <RouterLink to="/map"
      ><img src="@/assets/map-location-dot-solid.svg" class="map-icon"
    /></RouterLink>
    <RouterLink to="/city">Cities</RouterLink>
    <RouterLink to="/scooter">Scooters</RouterLink>
    <RouterLink to="/charging">Charging Stations</RouterLink>
    <RouterLink to="/parking">Parking</RouterLink>
    <RouterLink to="/rental">Rental Logs</RouterLink>
    <RouterLink to="/user">Users</RouterLink>
    <RouterLink to="/settings">Settings</RouterLink>
    <!-- </div> -->
  </div>
</template>

<style></style>
