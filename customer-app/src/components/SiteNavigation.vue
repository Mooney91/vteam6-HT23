<template>
  <footer class="fixed bottom-0 left-0 right-0 z-10 pt-4 pb-4 footer rounded-t-3xl bg-light-bg dark:bg-dark-bg">
    <nav class="container grid items-center grid-cols-3 py-2">

      <NavLink name="home" icon-classes="bx bx-home text-3xl" aria-label="Home"  />
      <NavLink name="map" icon-classes="bx bx-map text-3xl" aria-label="Map" />

      <button
        class="transition duration-200 active:scale-90 ease-out-expo"
        aria-label="Toggle theme"
        @click="toggleDarkTheme()"
      >
        <i :class="{ 'bx bxs-sun text-light-theme-toggle': isDarkTheme,
        'bx bxs-moon text-dark-theme-toggle': !isDarkTheme }"
        class="text-3xl"></i>
      </button>

    </nav>
  </footer>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import NavLink from './NavLink.vue'

const isDarkTheme = useDark();
const toggleDarkTheme = useToggle(isDarkTheme);
</script>

<style lang="css" scoped>
.footer {
  box-shadow: 0 -0.8rem 1.5rem 4px hsla(0, 0%, 0%, 0.2);
}
</style>
