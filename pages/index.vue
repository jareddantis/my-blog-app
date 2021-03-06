<template>
  <DefaultPage small-width>
    <h1 class="md:text-6xl text-4xl text-center font-bold mb-16">
      Latest posts
    </h1>

    <!-- Loading -->
    <div
      v-show="loading"
      class="w-full flex flex-row justify-center items-center"
    >
      <SimpleSpinner />
    </div>
    <p v-show="!loading && posts.length === 0" class="text-center">
      No posts.
    </p>

    <!-- Blog posts -->
    <article
      v-for="post in posts"
      :key="post.id"
      class="prose mx-auto max-w-full w-full mb-12 last:mb-8"
    >
      <nuxt-link :to="'/post/' + post.id" class="no-underline hover:underline">
        <h1 class="mb-0">
          {{ post.title }}
        </h1>
      </nuxt-link>
      <h3 class="text-teal-600 mt-0 mb-2 font-normal">
        by
        <a
          :href="'mailto:' + post.authorEmail"
          class="text-teal-600 font-bold"
          rel="noopener"
          target="_blank"
        >{{ post.author }}</a>
        &#8212; {{ post.timestamp }}
      </h3>
      <p class="font-serif">
        {{ post.content }}
      </p>
    </article>
  </DefaultPage>
</template>

<script>
import DefaultPage from '~/components/DefaultPage.vue'
import SimpleSpinner from '~/components/SimpleSpinner.vue'

export default {
  name: 'IndexPage',
  components: { DefaultPage, SimpleSpinner },
  data () {
    return {
      loading: true,
      posts: []
    }
  },
  mounted () {
    // Get all blog posts
    this.fetchPosts()
  },
  methods: {
    async fetchPosts () {
      const authors = {}

      // Fetch all authors first
      const authorQuerySnapshot = await this.$fire.firestore
        .collection('authors')
        .get()
      authorQuerySnapshot.forEach((doc) => {
        const author = doc.data()

        // Save author's name and email by ID
        authors[doc.id] = {
          name: author.name,
          email: author.email
        }
      })
      console.log(authors)

      // Fetch the blog posts
      const postQuerySnapshot = await this.$fire.firestore
        .collection('blog')
        .orderBy('date', 'desc')
        .get()
      postQuerySnapshot.forEach((doc) => {
        const post = doc.data()

        // Get author's name and email
        const author = authors[doc.data().author]

        // Truncate post content to 200 characters
        let content = post.content.substring(0, 200)
        if (post.content.length > 200) {
          content += '...'
        }

        // Save post object to list
        this.posts.push({
          id: doc.id,
          title: post.title,
          author: author.name,
          authorEmail: author.email,
          content,
          timestamp: post.date.toDate().toDateString()
        })
      })

      this.loading = false
    }
  }
}
</script>
