<template>
  <nav class="sticky top-0 bg-white w-full border-b border-gray-200 mb-8">
    <div
      class="flex flex-row flex-wrap justify-between items-center max-w-6xl w-full mx-auto p-6"
    >
      <nuxt-link to="/" class="flex items-center">
        <img class="h-8 mr-4" src="/logo/1x/JotLogo.png" alt="Jot">
        <span
          class="hidden md:inline-block self-center text-xl font-semibold text-black"
        >Jot</span>
      </nuxt-link>
      <div class="flex flex-row justify-end items-center">
        <nuxt-link to="/search">
          <button
            type="button"
            class="text-gray-600 hover:text-gray-800 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm p-2.5 mr-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </nuxt-link>
        <nuxt-link v-if="isLoggedIn && !isDashboard" to="/dashboard">
          <button
            type="button"
            class="text-white bg-teal-600 hover:bg-teal-800 border-2 border-teal-600 hover:border-teal-800 focus:ring-4 focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-3"
          >
            Dashboard
          </button>
        </nuxt-link>
        <nuxt-link v-if="isLoggedIn" to="/logout">
          <button
            type="button"
            class="text-teal-600 bg-white border-2 border-teal-600 hover:border-teal-800 focus:ring-4 focus:ring-teal-300 hover:text-teal-800 font-bold rounded-lg text-sm px-5 py-2.5"
          >
            Log out
          </button>
        </nuxt-link>
        <nuxt-link v-else to="/login">
          <button
            type="button"
            class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5"
          >
            Log in
          </button>
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'NavigationBar',
  props: {
    isDashboard: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    }),
    ...mapState({
      authUser: state => state.authUser
    })
  }
}
</script>
