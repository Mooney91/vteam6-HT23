<template>
  <div class="w-full h-full p-8">

    <h1
      class="mb-4 text-2xl font-bold text-dark-bg-alt dark:text-light-bg-alt font-Roboto"
    >
    Account Details
    </h1>

    <form @submit.prevent="updateAccount">

      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <div class="">
            <label for="firstName" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>First Name</span>
              <input placeholder="Enter your first name" type="text" id="firstName" v-model="firstName" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" autocomplete="given-name">
            </label>
          </div>

          <div class="">
            <label for="lastName" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Last Name</span>
              <input placeholder="Enter your last name" type="text" id="lastName" v-model="lastName" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" autocomplete="family-name">
            </label>
          </div>

          <div class="">
            <label for="email" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Email</span>
              <input placeholder="Enter your email address" type="email" id="email" v-model="email" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" autocomplete="email">
            </label>
          </div>

          <div class="">
            <label for="password" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Password</span>
              <div class="relative">
                <input placeholder="Enter your password" :type="showPassword ? 'text' : 'password'" id="password" v-model="password" class="block w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" autocomplete="current-password">

                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    :class="{'hidden': !showPassword, 'block':showPassword }"
                  >
                    <i
                      class='text-2xl bx bxs-lock-open'
                    ></i>
                  </button>

                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    :class="{'block': !showPassword, 'hidden':showPassword }"
                  >
                    <i
                      class='text-2xl bx bxs-lock'
                    ></i>
                  </button>
                </div>

              </div>

            </label>
          </div>

          <div class="">
            <label for="accountBalance" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Account Balance</span>

              <div class="relative">
                <input type="number" id="accountBalance" v-model="accountBalance" class="w-full p-2 bg-gray-200 rounded-md outline-none dark:bg-gray-700 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:border-gray-500" readonly>

                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span>SEK</span>
                </div>
              </div>

            </label>
          </div>

          <div class="">
            <label for="paymentType" class="block mb-2 text-lg font-bold text-dark-bg-alt dark:text-light-bg-alt font-Karla">
              <span>Payment Type</span>
              <select id="paymentType" v-model="paymentType" class="w-full p-2 bg-transparent border-2 border-gray-300 rounded-md shadow-lg outline-none dark:border-gray-500 focus:border-blue-300 text-dark-bg-alt dark:text-light-bg-alt font-PlexMono dark:bg-dark-bg-alt">
                <option value="1">Card</option>
                <option value="2">Swish</option>
              </select>
            </label>
          </div>

          <div class="">
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

          <button
            type="button"
            @click="signOut()"
            class="flex items-center self-center gap-4 px-4 py-2 transition duration-200 bg-orange-600 rounded-lg shadow-lg max-w-max ease-out-expo text-slate-50 active:bg-orange-700 active:scale-90"
          >
            <span class="text-xl font-Roboto">Sign Out</span>
            <i class='text-2xl bx bxs-exit' style='color:#ffffff' ></i>
          </button>

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
import router from '../router'

const showPassword = ref(false)
const firstName = ref("")
const lastName = ref("")
const email = ref("")
const password = ref("")
const accountBalance = ref(0)
const paymentType = ref("1")
const role = ref("Customer")

onMounted(() => {
  if (!localStorage.user) {
    router.push({ name: 'login' })
    return
  }

  const user = JSON.parse(localStorage.user)

  firstName.value = user.FirstName
  lastName.value = user.LastName
  password.value = user.Password
  email.value = user.Email
  accountBalance.value = user.AccountBalance
  paymentType.value = user.PaymentType
  role.value = user.Role
})

const updateAccount = async () => {
  const user = JSON.parse(localStorage.user)

  user.FirstName = firstName.value
  user.LastName = lastName.value
  user.Password = password.value
  user.Email = email.value
  user.AccountBalance = accountBalance.value
  user.PaymentType = paymentType.value
  user.Role = role.value

  const wasSuccessful = await utils.updateUser(user)

  if (!wasSuccessful) {
    alert("Could not update your account! Please try again in a few minutes.")
    return
  }

  localStorage.user = JSON.stringify(user)
};

const signOut = () => {
  localStorage.removeItem('user')
  location.reload()
}
</script>

<style lang="css" scoped></style>
