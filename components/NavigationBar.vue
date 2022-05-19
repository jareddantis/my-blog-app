<template>
  <nav class="bg-white w-full">
    <div class="flex flex-row flex-wrap justify-between items-center max-w-6xl w-full mx-auto p-6">
      <nuxt-link to="/" class="flex items-center">
        <img class="h-8 mr-4" src="/logo/1x/JotLogo.png" alt="Jot">
        <span class="self-center text-xl font-semibold text-black">My blog</span>
      </nuxt-link>
      <div>
        <button
          v-if="isLoggedIn && !isDashboard"
          type="button"
          class="text-white bg-teal-600 hover:bg-teal-800 border-2 border-teal-600 hover:border-teal-800
                focus:ring-4 focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-3"
        >
          Dashboard
        </button>
        <button
          v-if="isLoggedIn"
          type="button"
          class="text-teal-600 bg-white border-2 border-teal-600 hover:border-teal-800 focus:ring-4
                focus:ring-teal-300 hover:text-teal-800 font-bold rounded-lg text-sm px-5 py-2.5"
          @click="logout()"
        >
          Log out
        </button>
        <nuxt-link v-else to="/login">
          <button
            type="button"
            class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300
                  font-bold rounded-lg text-sm px-5 py-2.5"
          >
            Log in
          </button>
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    isDashboard: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout () {
      this.$fire.auth.signOut()
        .then(() => {
          this.$router.go('/')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
