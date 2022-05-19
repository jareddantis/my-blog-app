<template>
  <DefaultPage small-width>
    <h1 class="md:text-6xl text-4xl text-center font-bold mb-16">
      My blog
    </h1>

    <!-- Blog posts -->
    <article class="prose mx-auto max-w-full w-full">
      <nuxt-link to="/post/1" class="no-underline hover:underline">
        <h1 class="mb-0">
          Hello world
        </h1>
      </nuxt-link>
      <h3 class="text-teal-500 mt-0 mb-4">
        by Author &#8212; May 21, 2022
      </h3>
      <p class="font-serif">
        Morbi placerat congue nisi et eleifend. Nam cursus cursus orci eget
        molestie. Donec libero lorem, porta quis gravida id, tempor ut arcu.
        Mauris in posuere odio. In in eleifend augue. Phasellus vitae egestas
        tellus. Mauris non posuere elit, ut tincidunt felis. Donec sit amet leo
        vel ante congue vulputate et ut elit. Nam ipsum nisi, ultrices vitae
        ullamcorper non, luctus id lectus. Vivamus vulputate nec massa at
        laoreet. Etiam sit amet blandit purus.
      </p>
    </article>
  </DefaultPage>
</template>

<script>
import DefaultPage from '~/components/DefaultPage.vue'

export default {
  name: 'IndexPage',
  components: { DefaultPage }
}
</script>
