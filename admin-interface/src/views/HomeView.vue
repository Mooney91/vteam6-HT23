<!--
<script setup>
import HomeItem from '../components/HomeItem.vue'
</script>

<template>
  <main>
    <HomeItem />
  </main>
</template>
-->

<template>
  <!--
      <h1>Welcome {{ user.name }}!</h1>
      <p>This is the administrative interface (admin panel) for <i>Svenska Elsparkscyklar AB</i>.</p>
      <p>Here you can view and manage data in the system.</p>
  </div>
  <div v-else>
      <h1>Welcome!</h1>
      <h2>Use the login button to gain access to the application!</h2>
      <p>This is the administrative interface (admin panel) for <i>Svenska Elsparkscyklar AB</i>.</p>
      <p>Here you can view and manage data in the system.</p>
  </div>

  -->

  <h1>Welcome!</h1>

  <p>This is the administrative interface (admin panel) for <i>Svenska Elsparkscyklar AB</i>.</p>
  <p>Here you can view and manage data in the system.</p>

  <div class="title-page-button">
    <div>
      <RouterLink to="/map"
        ><img src="@/assets/map-location-dot-solid.svg" class="home-images"
      /></RouterLink>
    </div>
    <div>
      <RouterLink to="/city"><img src="@/assets/city-solid.svg" class="home-images" /></RouterLink>
    </div>
    <div>
      <RouterLink to="/scooter"><img src="@/assets/scooter.svg" class="home-images" /></RouterLink>
    </div>
    <div>
      <RouterLink to="/charging"
        ><img src="@/assets/charging-station-solid.svg" class="home-images"
      /></RouterLink>
    </div>
    <div>
      <RouterLink to="/parking"
        ><img src="@/assets/square-parking-solid.svg" class="home-images"
      /></RouterLink>
    </div>
    <div>
      <RouterLink to="/rental"
        ><img src="@/assets/cart-shopping-solid.svg" class="home-images"
      /></RouterLink>
    </div>
    <div>
      <RouterLink to="/user"><img src="@/assets/user-solid.svg" class="home-images" /></RouterLink>
    </div>
    <div>
      <RouterLink to="/settings"
        ><img src="@/assets/gear-solid.svg" class="home-images"
      /></RouterLink>
    </div>
  </div>
</template>

<script>
// import { useAuth0 } from '@auth0/auth0-vue';
import { RouterLink } from 'vue-router'

export default {
  setup() {
    // const auth0 = useAuth0();
    // return {
    //     login() {
    //         auth0.loginWithRedirect();
    //     },
    //     logout() {
    //         auth0.logout();
    //     },
    //     user: auth0.user,
    //     isAuthenticated: auth0.isAuthenticated
    // };
  },
  components: {
    RouterLink
  }
}
</script>
