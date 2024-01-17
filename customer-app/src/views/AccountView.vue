<template>
  <div class="w-full h-full p-8">

    <h1
      class="mb-4 text-2xl font-bold text-dark-bg-alt dark:text-light-bg-alt font-Roboto"
    >
    Account Details
    </h1>

    <form @submit.prevent="updateAccount">

      <div class="flex flex-col gap-4">
        <div>
          <div class="mb-4">
            <label for="firstName" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>First Name</span>
              <input type="text" id="firstName" v-model="firstName" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" autocomplete="given-name">
            </label>
          </div>

          <div class="mb-4">
            <label for="lastName" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Last Name</span>
              <input type="text" id="lastName" v-model="lastName" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" autocomplete="family-name">
            </label>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Email</span>
              <input type="email" id="email" v-model="email" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" autocomplete="email">
            </label>
          </div>

          <div class="mb-4">
            <label for="password" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Password</span>
              <input type="password" id="password" v-model="password" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" autocomplete="current-password">
            </label>
          </div>

          <div class="mb-4">
            <label for="accountBalance" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Account Balance</span>
              <input type="number" id="accountBalance" v-model="accountBalance" class="w-full p-2 bg-gray-200 rounded-md outline-none dark:bg-gray-700 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" readonly>
            </label>
          </div>

          <div class="mb-4">
            <label for="paymentType" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Payment Type</span>
              <select id="paymentType" v-model="paymentType" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none dark:border-gray-500 focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:bg-dark-bg-alt">
                <option value="1">Card</option>
                <option value="2">Swish</option>
              </select>
            </label>
          </div>

          <div class="mb-4">
            <label for="role" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Role</span>
              <select id="role" v-model="role" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:bg-dark-bg-alt dark:border-gray-500">
                <option value="Customer">Customer</option>
              </select>
            </label>
          </div>

        </div>

        <div class="flex flex-row gap-4 justify-evenly">
          <button
            type="submit"
            class="flex items-center gap-4 px-4 py-2 transition duration-200 bg-blue-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 active:bg-blue-700 active:scale-90"
          >
            <span class="text-xl font-Roboto">Update</span>
            <i class='text-2xl bx bx-upload' style='color:#ffffff' ></i>
          </button>

            <router-link
              :to="{ name: 'home' }"
              v-slot="{href, navigate}"
              >
                <button
                  :href="href"
                  @click="navigate"
                  class="flex items-center gap-4 px-4 py-2 transition duration-200 bg-blue-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 active:bg-blue-700 active:scale-90"
                >
                  <span class="text-xl font-Roboto">Go back</span>
                  <i class='text-2xl bx bx-left-top-arrow-circle'></i>
                </button>
            </router-link>
        </div>
      </div>

    </form>

  </div>
  <SiteNavigation />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { utils } from '../utils.js'
import SiteNavigation from '../components/SiteNavigation.vue'

const firstName = ref("")
const lastName = ref("")
const email = ref("")
const password = ref("")
const accountBalance = ref(0)
const paymentType = ref("1")
const role = ref("Customer")

onMounted(async() => {
  if (localStorage.user) {
    firstName.value = localStorage.user.FirstName
    lastName.value = localStorage.user.LastName
    password.value = localStorage.user.Password
    email.value = localStorage.user.Email
    accountBalance.value = localStorage.user.AccountBalance
    paymentType.value = localStorage.user.PaymentType
    role.value = localStorage.user.Role
  }
})

const updateAccount = async () => {
  await utils.updateAccount(firstName.value, lastName.value, password.value, email.value, paymentType.value, role.value)
};
</script>

<style lang="css" scoped></style>
