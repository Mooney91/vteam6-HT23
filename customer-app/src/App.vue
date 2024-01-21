<template>
  <div class="app font-Roboto" :class="{ 'bg-dark-bg-alt': isDarkTheme, 'bg-light-bg-alt': !isDarkTheme }">
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'
import { RouterView } from 'vue-router'

const isDarkTheme = useDark()
</script>

<style lang="css" scoped>
.main {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  grid-template-rows: 0.9fr 0.1fr;
}
</style>
