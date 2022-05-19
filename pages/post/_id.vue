<template>
  <div class="bg-white bg-full">
    <!-- Navbar -->
    <NavigationBar is-logged-in />

    <!-- Main content -->
    <div class="md:max-w-2xl max-w-xl w-full mx-auto py-3 px-6">
      <!-- Post title -->
      <h1 class="md:text-6xl text-4xl font-bold font-slight-italic mb-4">My blog</h1>

      <!-- Post author and date -->
      <h2 class="text-xl text-teal-500">by Author<br>May 21, 2022</h2>

      <!-- Post content -->
      <article class="prose mt-8 mx-auto max-w-full w-full">
        <p class="font-serif">
          Morbi placerat congue nisi et eleifend. Nam cursus cursus orci eget molestie.
          Donec libero lorem, porta quis gravida id, tempor ut arcu. Mauris in posuere odio.
          In in eleifend augue. Phasellus vitae egestas tellus. Mauris non posuere elit,
          ut tincidunt felis. Donec sit amet leo vel ante congue vulputate et ut elit.
          Nam ipsum nisi, ultrices vitae ullamcorper non, luctus id lectus. Vivamus vulputate
          nec massa at laoreet. Etiam sit amet blandit purus.
        </p>
      </article>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.font-slight-italic {
  font-variation-settings: "slnt" -5;
}
</style>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
export default {
  name: 'PostPage',
  components: { NavigationBar }
}
</script>
