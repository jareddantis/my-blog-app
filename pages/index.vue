<template>
  <div class="bg-white w-full">
    <!-- Navbar -->
    <NavigationBar is-logged-in />

    <!-- Main content -->
    <div class="max-w-6xl w-full mx-auto p-3">
      <h1 class="text-6xl text-center font-bold">Home</h1>

      <!-- Blog posts -->
      <article class="prose">
        <h1>Hello world</h1>
        <p>Good morning</p>
      </article>
    </div>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
export default {
  name: 'IndexPage',
  components: { NavigationBar }
}
</script>
