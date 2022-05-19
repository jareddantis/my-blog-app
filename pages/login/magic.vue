<template>
  <div class="bg-gray-100 flex justify-center items-center w-screen h-screen">
    <div class="text-center" v-if="emailNotPresent">
      <h1 class="text-4xl mb-4 font-bold">Could not log you in</h1>
      <p>Try opening the email link in the same device you used to log in.</p>
    </div>
    <div class="text-center" v-else>
      <h1 class="text-4xl mb-4 font-bold">Welcome back{{ email && `, ${$data.email}` }}</h1>
      <p>Logging you in, please wait...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MagicLoginPage',
  data () {
    return {
      email: '',
      emailNotPresent: {
        type: Boolean,
        default: false
      }
    }
  },
  mounted () {
    if (this.$fire.auth.isSignInWithEmailLink(window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn')

      if (!email) {
        this.$data.emailNotPresent = true
        return
      }

      this.$fire.auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn')
          console.log('result', result)
          this.$router.push({ name: 'IndexPage' })
        }).catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
