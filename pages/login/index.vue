<template>
  <div
    class="md:bg-teal-100 w-screen h-screen flex justify-center items-center"
  >
    <!-- Login form container card -->
    <div class="bg-white w-full md:max-w-sm md:rounded-lg md:shadow-xl">
      <!-- Card contents -->
      <div class="w-full p-6 flex flex-col items-center">
        <!-- Header -->
        <img class="w-8 mb-8" src="/logo/SVG/JotLogo.svg" alt="Jot">
        <h1 class="text-2xl font-bold">
          Welcome to Jot
        </h1>
        <p class="text-center mt-2 mb-8">
          Whether you're new or returning,<br>just sign in with your Google
          account below.
        </p>

        <!-- Sign in with Google -->
        <button
          class="bg-teal-500 rounded-md p-3 w-full text-white font-bold hover:bg-teal-700"
          @click="signInWithGoogle()"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginPage',
  data () {
    return {
      isClient: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  beforeMount () {
    this.$data.isClient = true
  },
  mounted () {
    // Check if already logged in
    if (this.isLoggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    signInWithGoogle () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      this.$fire.auth.useDeviceLanguage()
      this.$fire.auth
        .signInWithPopup(provider)
        .then((result) => {
          this.$router.push('/')
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>
