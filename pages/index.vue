<template>
  <div class="bg-white w-full">
    <!-- Navbar -->
    <NavigationBar is-logged-in />

    <!-- Main content -->
    <div class="md:max-w-2xl max-w-xl w-full mx-auto py-3 px-6">
      <h1 class="md:text-6xl text-4xl text-center font-bold">My blog</h1>
      <hr class="my-8">

      <!-- Blog posts -->
      <article class="prose mx-auto max-w-full w-full">
        <h1 class="mb-0">Hello world</h1>
        <h3 class="text-teal-500 mt-0 mb-4">by Author &#8212; May 21, 2022</h3>
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

<script>
import NavigationBar from '~/components/NavigationBar.vue'
export default {
  name: 'IndexPage',
  components: { NavigationBar }
}
</script>
