<template>
  <main class="relative flex flex-col justify-center h-full p-8">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="login">

      <div class="mb-4">
        <label for="email" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
          <span>Email</span>
          <input type="email" id="email" v-model="email" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono" autocomplete="email">
        </label>
      </div>

      <div class="mb-4">
        <label for="password" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
          <span>Password</span>
          <input type="password" id="password" v-model="password" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono" autocomplete="current-password">
        </label>
      </div>

      <div class="flex justify-center w-full">

        <button
          type="submit"
          class="flex items-center gap-4 px-4 py-2 transition duration-200 bg-blue-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 active:bg-blue-700 active:scale-90"
        >
          <span class="text-xl font-Roboto">Login</span>
          <i class='text-2xl bx bxs-log-in-circle'></i>
        </button>

      </div>

    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { utils } from '../utils.js'
import router from '../router'

const email = ref("")
const password = ref("")

const login = async () => {
  localStorage.userEmail = email.value
  localStorage.user = await utils.getUser(email.value)

  console.log(`Email: ${localStorage.userEmail}`)
  console.log(`user: ${localStorage.user}`)

  router.push({ name: 'home' })
}
</script>

<style lang="css" scoped></style>
