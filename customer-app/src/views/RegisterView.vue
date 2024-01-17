<template>
  <div class="relative flex flex-col justify-center h-full p-8">

    <form @submit.prevent="login">

      <div class="mb-4">
        <label for="username" class="block mb-2 text-sm font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
          <span>Username</span>
          <input type="text" id="username" v-model="username" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono" autocomplete="username">
        </label>
      </div>

      <div class="mb-4">
        <label for="username" class="block mb-2 text-sm font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
          <span>Email</span>
          <input type="email" id="email" v-model="username" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono" autocomplete="email">
        </label>
      </div>

      <div class="mb-4">
        <label for="password" class="block mb-2 text-sm font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
          <span>Password</span>
          <input type="password" id="password" v-model="password" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono" autocomplete="new-password">
        </label>
      </div>

      <div class="mb-4">
        <label for="password-again" class="block mb-2 text-sm font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
          <span>Password (Again)</span>
          <input type="password" id="password-again" v-model="password" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono" autocomplete="new-password">
        </label>
        </div>

      <div class="flex flex-row gap-4">

        <button
          type="submit"
          class="flex items-center gap-4 px-4 py-2 transition duration-200 bg-blue-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 active:bg-blue-700 active:scale-90"
        >
          <span class="text-xl font-Roboto">Create</span>
          <i class='text-2xl bx bx-user-plus'></i>
        </button>

        <router-link
          :to="{ name: 'login' }"
          v-slot="{href, navigate}"
          >
            <button
              :href="href"
              @click="navigate"
              class="flex items-center gap-4 px-4 py-2 transition duration-200 bg-orange-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 active:bg-orange-700 active:scale-90"
            >
              <span class="text-xl font-Roboto">Login Instead</span>
              <i class='text-2xl bx bxs-log-in-circle'></i>
            </button>
        </router-link>

      </div>
    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { utils } from '../utils.js'

const username = ref("")
const password = ref("")

// const create = () => {
//   // TODO: Add logic
// }
</script>

<style lang="css" scoped></style>
