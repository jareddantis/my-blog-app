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
          Log in or register
        </h1>
        <p class="text-center mt-2 mb-8">
          Whether you're new or returning,<br>just enter your e-mail address
          below.
        </p>

        <!-- Email login (passwordless) -->
        <form class="w-full" @submit.prevent="onSubmit()">
          <input
            v-model="email"
            type="email"
            class="bg-gray-100 rounded-md p-3 w-full mb-4"
            placeholder="E-mail address"
          >
          <input
            type="submit"
            class="bg-teal-500 rounded-md p-3 w-full text-white font-bold hover:bg-teal-700 cursor-pointer"
            value="Send magic login link"
          >
        </form>

        <!-- Divider -->
        <div class="flex flex-row justify-between items-center w-full my-6">
          <div class="grow bg-gray-300 h-px w-full" />
          <span class="flex-none grow-none text-gray-300 px-3 font-bold">
            or
          </span>
          <div class="grow bg-gray-300 h-px w-full" />
        </div>

        <!-- Sign in with Google -->
        <button
          class="bg-gray-500 rounded-md p-3 w-full text-white font-bold hover:bg-gray-700"
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
      email: '',
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
    onSubmit () {
      const email = this.$data.email

      this.$fire.auth
        .sendSignInLinkToEmail(email, {
          url: `${window.location.origin}/login/magic`,
          handleCodeInApp: true
        })
        .then(() => {
          if (this.$data.isClient) {
            window.localStorage.setItem('emailForSignIn', email)
          }
          this.$router.push('/login/linksent')
        })
        .catch((error) => {
          alert(error)
        })
    },
    signInWithGoogle () {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      this.$fire.auth.useDeviceLanguage()
      this.$fire.auth
        .signInWithRedirect(provider)
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
