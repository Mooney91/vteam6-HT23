<template>
  <span v-if="isActive" class="dot"></span>
</template>

<script setup>
defineProps(['isActive'])
</script>

<style scoped>
.dot {
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  bottom: -0.7rem;
  border-radius: 50%;
}
</style>

<!-- background-color: theme('colors.light-text'); -->
