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
import router from '../router'

let hasScooter = ref(false)

onMounted(() => {
  if (!localStorage.user) {
    router.push({ name: 'login' })
    return
  }

  hasScooter.value = !!localStorage.rentId
})
</script>

<style lang="css" scoped></style>
