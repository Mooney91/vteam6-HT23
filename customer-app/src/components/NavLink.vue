<template>
  <RouterLink :to="{ name }" class="relative flex flex-col items-center transition duration-200 active:scale-90 ease-out-expo"
  :class="{ 'text-light-fg dark:text-dark-fg': isRouteActive(), 'text-light-neutral-fg dark:text-dark-neutral-fg': !isRouteActive() }"
  >
    <i :class="iconClasses"></i>
    <DotIndicator :is-active="isRouteActive()" />
  </RouterLink>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import DotIndicator from './DotIndicator.vue'

const props = defineProps(['name', 'iconClasses'])
const $route = useRoute()

const isRouteActive = () => {
  return $route.name === props.name
}
</script>
