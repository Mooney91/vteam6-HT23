<template>
  <div class="container">

    <div class="flex flex-col items-center gap-8">
      <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold text-dark-bg-alt dark:text-light-bg-alt font-Roboto">
          Welcome Back, {{ userName }}!
        </h1>
        <h2 class="text-md text-dark-bg-alt dark:text-light-bg-alt font-Roboto">
          You have no active scooter in progress.
        </h2>
      </div>

      <router-link
        :to="{ name: 'account' }"
        v-slot="{href, navigate}"
        >
          <button
            :href="href"
            @click="navigate"
            class="flex items-center gap-4 px-4 py-2 transition duration-200 bg-blue-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 active:bg-blue-700 active:scale-90"
          >
            <span class="text-xl font-Roboto">View Account</span>
            <i class='text-2xl bx bxs-user'></i>
          </button>
      </router-link>

    </div>

    <form
      @submit.prevent="rentScooter"
      class="flex flex-col items-center gap-8"
    >
      <label
        for="scooterSelect"
        class="flex flex-col gap-4 text-lg font-semibold text-dark-bg-alt dark:text-light-bg-alt font-Roboto"
      >
        <span>Select a Scooter</span>
        <select
          v-model="selectedScooter"
          id="scooterSelect"
          class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:bg-dark-bg-alt dark:border-gray-500"
        >
          <option selected :disabled="selectedScooter === 'None'">None</option>
          <option
            v-for="scooter in availableScooters"
            :key="scooter.ScooterID"
            :value="scooter.ScooterID"
          >
          Scooter {{ scooter.ScooterID }} [{{ scooter.Battery }}%]
          </option>
        </select>
      </label>

      <button
        :disabled="selectedScooter === 'None'"
        type="submit"
        class="flex items-center gap-4 px-4 py-2 transition duration-200 bg-orange-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 enabled:active:bg-orange-700 enabled:active:scale-90 disabled:bg-gray-400 disabled:dark:bg-gray-500 disabled:text-slate-100 disabled:dark:text-slate-200 disabled:opacity-80"
      >
        <span class="text-xl font-Roboto">Start Renting</span>
        <i class='text-2xl bx bxs-credit-card'></i>
      </button>

    </form>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { utils } from '../utils.js'
import router from '../router'

let userName = ref("null")
let availableScooters = ref([])

const selectedScooter = ref("None")

onMounted(async () => {
  if (!localStorage.user) {
    router.push({ name: 'login' })
    return
  }

  const user = JSON.parse(localStorage.user)

  userName.value = user.FirstName

  const scooters = await utils.getScooters()
  availableScooters.value = scooters.filter(x => x.Status != "In Use").filter(x => x.Battery >= 30).slice(0, 20)
})

const rentScooter = async () => {
  if (localStorage.user && selectedScooter.value != "None") {
    localStorage.scooterId = selectedScooter.value
    console.log(localStorage.scooterId)

    const result = await utils.createRent(localStorage.user.UserID, localStorage.scooterId)

    if (!result) {
      alert("Could not rent the scooter! Please try again in a few minutes.")
      return
    }

    localStorage.rentId = result.RentalLogID
    location.reload()
  }
}
</script>

<style lang="css" scoped>
.container {
  height: 100%;
  display: grid;
  grid-template-rows: auto auto 0.25fr;
  place-items: center;
  padding: 4rem 0;
}
</style>
