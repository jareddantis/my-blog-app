<template>
  <DefaultPage>
    <h1 class="md:text-6xl text-4xl text-center font-bold mb-16">
      {{ query.length === 0 ? "Search" : 'Results for "' + query + '"' }}
    </h1>

    <!-- Search box -->
    <div class="mb-8">
      <input
        v-model.lazy="query"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md mb-4"
        type="text"
        placeholder="Type a query and press Enter..."
        @change="searchForPosts"
      >
    </div>

    <!-- Loading -->
    <div
      v-show="loading"
      class="w-full flex flex-row justify-center items-center"
    >
      <SimpleSpinner />
    </div>

    <!-- Search results -->
    <article
      v-for="post in posts"
      v-show="!loading"
      :key="post.id"
      class="prose mx-auto max-w-full w-full mb-12 last:mb-8"
    >
      <nuxt-link :to="'/post/' + post.id" class="no-underline hover:underline">
        <h1 class="mb-0">
          {{ post.title }}
        </h1>
      </nuxt-link>
      <h3 class="text-teal-600 mt-0 mb-2 font-normal">
        {{ post.timestamp }}
      </h3>
      <p class="font-serif">
        {{ post.content }}
      </p>
    </article>
  </DefaultPage>
</template>

<script>
import SimpleSpinner from '~/components/SimpleSpinner.vue'

export default {
  name: 'SearchPage',
  components: { SimpleSpinner },
  data () {
    return {
      loading: false,
      query: '',
      posts: []
    }
  },
  methods: {
    async searchForPosts () {
      this.loading = true
      this.posts = []

      // Get all blog posts
      await this.fetchPosts()
      this.loading = false
    },
    async fetchPosts () {
      // Fetch all posts.
      // Firestore does not yet support full text search, so we either have to use a third-party indexing service
      // like Algolia, or for a small app like this, we can just perform the filtering locally.
      const querySnapshot = await this.$fire.firestore
        .collection('blog')
        .orderBy('date', 'desc')
        .get()

      // Filter results for posts with matching title or content
      const posts = querySnapshot.docs.filter((doc) => {
        const post = doc.data()
        return (
          post.title.toLowerCase().includes(this.query.toLowerCase()) ||
          post.content.toLowerCase().includes(this.query.toLowerCase())
        )
      })

      // Add results to posts
      this.posts = posts.map((doc) => {
        const post = {}
        post.id = doc.id
        post.title = doc.data().title
        post.timestamp = doc.data().date.toDate().toDateString()

        // Truncate post content to 100 chars
        post.content = doc.data().content.substring(0, 100)
        if (post.content.length > 100) {
          post.content += '...'
        }

        return post
      })
    }
  }
}
</script>
