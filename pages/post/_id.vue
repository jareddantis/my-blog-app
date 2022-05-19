<template>
  <DefaultPage>
    <!-- Post title -->
    <h1 class="md:text-6xl text-4xl font-bold font-slight-italic mb-4">
      {{ title }}
    </h1>

    <!-- Post author and date -->
    <h2 class="text-xl text-teal-500">
      {{ authorName }}<br>
      {{ timestamp }}
    </h2>

    <!-- Post content -->
    <article class="prose mt-8 mx-auto max-w-full w-full">
      <p class="font-serif">
        {{ content }}
      </p>
    </article>
  </DefaultPage>
</template>

<script>
import DefaultPage from '~/components/DefaultPage.vue'

export default {
  name: 'PostPage',
  components: { DefaultPage },
  data () {
    return {
      title: 'Loading post...',
      authorName: '',
      content: '',
      timestamp: ''
    }
  },
  mounted () {
    this.fetchPost()
  },
  methods: {
    fetchPost () {
      // Get post ID from the route
      const postId = this.$route.params.id

      this.$fire.firestore
        .collection('blog')
        .doc(postId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const post = doc.data()
            this.title = post.title
            this.authorName = 'by ' + post.author
            this.content = post.content
            this.timestamp = post.date.toDate().toDateString()
          }
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.font-slight-italic {
  font-variation-settings: "slnt" -5;
}
</style>
