<template>
  <div class="bg-gray-100 flex justify-center items-center w-screen h-screen">
    <div v-if="emailNotPresent" class="text-center">
      <h1 class="text-4xl mb-4 font-bold">
        Could not log you in
      </h1>
      <p>Try opening the email link in the same device you used to log in.</p>
    </div>
    <div v-else class="text-center">
      <h1 class="text-4xl mb-4 font-bold">
        Welcome back{{ email && `, ${$data.email}` }}
      </h1>
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
      emailNotPresent: false,
      isClient: false
    }
  },
  beforeMount () {
    this.$data.isClient = true
  },
  mounted () {
    if (this.$fire.auth.isSignInWithEmailLink(window.location.href)) {
      const email = window.localStorage.getItem('emailForSignIn')

      if (!email) {
        this.$data.emailNotPresent = true
        return
      }

      this.$data.email = email
      this.$fire.auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          if (this.$data.isClient) {
            window.localStorage.removeItem('emailForSignIn')
          }
          console.log('result', result)
          this.$router.go('/')
        }).catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
