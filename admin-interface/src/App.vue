<script>
import { RouterView } from 'vue-router'
import TitleItem from './components/TitleItem.vue'
import NavigationItem from './components/NavigationItem.vue'

/**
 * Vue component representing the main application.
 * @name App
 * @component
 */
export default {
  name: 'App',
  components: {
    TitleItem,
    NavigationItem,
    RouterView
  },
  /* Data function that returns the backend.
   * @function
   * @returns {Object} The initial data object.
   */
  data() {
    return {
      backend: 'http://localhost:1337'
    }
  }
}
</script>

<template>
  <div class="main">
    <TitleItem />
    <NavigationItem />
    <div class="content">
      <RouterView :backend="backend" :key="componentKey" />
    </div>
  </div>
</template>

<style scoped></style>
