<template>
  <div class="bg-gray-100 flex justify-center items-center w-screen h-screen">
    <div class="text-center">
      <h1 class="text-4xl mb-4 font-bold">
        {{ error ? "Error" : "Logging you out..." }}
      </h1>
      <p>
        {{ error ? error : "You will be redirected to the homepage shortly." }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoutPage',
  props: {
    error: null
  },
  mounted () {
    // Logout Firebase auth
    this.$fire.auth
      .signOut()
      .then(() => {
        // Redirect to home page
        this.$router.push('/')
      })
      .catch((error) => {
        this.$data.error = error
      })
  }
}
</script>
