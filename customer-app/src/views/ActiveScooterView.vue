<template>
  <div class="container">
    <img :src="ScooterImage" alt="Scooter" class="object-contain max-h-48" />

    <button 
        class="flex items-center gap-4 px-4 py-2 transition duration-200 bg-blue-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 active:bg-blue-700 active:scale-90"
        @click="returnScooter"
    >
        <span class="text-xl font-Roboto">Return Scooter</span>
        <i class='text-2xl bx bxs-eject'></i>
    </button>

    <div class="grid grid-cols-2 gap-8">
        <CardItem title="ID" :subtitle="id"/>
        <CardItem title="Status" :subtitle="status" />
        <CardItem title="Battery Left" :subtitle="battery + ' %'" />
        <CardItem title="Average Speed" :subtitle="speed + ' km/h'" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { utils } from '../utils.js'
import ScooterImage from '../assets/img/Scooter.png'
import CardItem from '../components/CardItem.vue'
import router from '../router'

let id = ref("null")
let status = ref("null")
let speed = ref(0)
let battery = ref(0)

onMounted(async () => {
  if (!localStorage.user) {
    router.push({ name: 'login' })
    return
  }

  if (localStorage.rentId && localStorage.scooterId) {
    try {
      const scooter = await utils.getScooter(localStorage.scooterId)

      id.value = localStorage.scooterId
      status.value = scooter.Status
      speed.value = scooter.Speed
      battery.value = scooter.Battery

      const rentDetails = await utils.getRentDetails(localStorage.rentId)
      console.log(rentDetails)

      // rentDetails.Paid
      // rentDetails.StartTime
      // rentDetails.EndTime
      // rentDetails.StartStation
      // rentDetails.Cost

    } catch (err) {
      console.error(err)
    }
  }
})

const returnScooter = async () => {
  if (localStorage.scooterId) {
    try {
      const wasSuccessful = await utils.stopRent(localStorage.scooterId, 5 /* stopStationId */)

      if (!wasSuccessful) {
        alert("Could not return the scooter! Please try again in a few minutes.")
        return
      }

      localStorage.removeItem('scooterId')
      localStorage.removeItem('rentId')

      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  display: grid;
  grid-template-rows: 0.2fr auto 1fr;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  padding: 4rem 0;
}
</style>