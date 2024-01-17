<template>
  <ActiveScooterView v-if="hasScooter" />
  <ScooterSelectionView v-else />
  <SiteNavigation />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ScooterSelectionView from './ScooterSelectionView.vue'
import ActiveScooterView from './ActiveScooterView.vue'
import SiteNavigation from '../components/SiteNavigation.vue'

let hasScooter = ref(false)

onMounted(() => {
  hasScooter.value = !!localStorage.scooterId 
})
</script>

<style lang="css" scoped></style>
