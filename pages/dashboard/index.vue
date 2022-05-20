<template>
  <DefaultPage is-dashboard>
    <h1 class="md:text-6xl text-4xl text-center font-bold mb-16">
      Hi, {{ userName }}
    </h1>

    <!-- Loading spinner -->
    <div
      v-show="loading"
      class="w-full flex flex-row justify-center items-center"
    >
      <SimpleSpinner />
    </div>

    <!-- Post create button -->
    <nuxt-link v-show="!loading" to="/dashboard/create" class="no-underline">
      <button
        type="button"
        class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-bold rounded-lg text-xl p-5 mx-auto mb-8 max-w-xs w-full block"
      >
        Create post
      </button>
    </nuxt-link>
    <p v-show="!loading && posts.length === 0" class="text-center mt-8">
      You haven't posted anything yet!
    </p>

    <!-- List of blog entries -->
    <div
      v-for="post in posts"
      :key="post.id"
      class="flex flex-row justify-between items-center w-full mb-4 last:mb-8"
    >
      <!-- Post title and date -->
      <div>
        <h3 class="font-bold text-2xl">
          {{ post.title }}
        </h3>
        <p>{{ post.timestamp }}</p>
      </div>

      <!-- Post controls -->
      <div class="shrink-0">
        <nuxt-link :to="'/dashboard/edit/' + post.id">
          <button
            type="button"
            class="text-white bg-teal-600 hover:bg-teal-800 border-2 border-teal-600 hover:border-teal-800 focus:ring-4 focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-3"
          >
            Edit
          </button>
        </nuxt-link>
        <button
          type="button"
          class="text-red-600 bg-white border-2 border-red-600 hover:border-red-800 focus:ring-4 focus:ring-red-300 hover:text-red-800 font-bold rounded-lg text-sm px-5 py-2.5"
          @click="confirmDelete(post.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </DefaultPage>
</template>

<script>
import { mapGetters } from 'vuex'
import DefaultPage from '~/components/DefaultPage.vue'
import SimpleSpinner from '~/components/SimpleSpinner.vue'

export default {
  name: 'DashboardIndexPage',
  computed: {
    ...mapGetters({
      userName: 'userName',
      userID: 'userID'
    })
  },
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
    fetchPosts () {
      // Fetch all blog posts whose author matches this author's ID
      this.$fire.firestore
        .collection('blog')
        .where('author', '==', this.userID)
        .orderBy('date', 'desc')
        .get()
        .then((snapshot) => {
          this.posts = []
          snapshot.forEach((doc) => {
            // Save post object to list
            this.posts.push({
              id: doc.id,
              title: doc.data().title,
              timestamp: doc.data().date.toDate().toDateString()
            })
          })
          this.loading = false
        })
    },
    confirmDelete (postID) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.deletePost(postID)
      }
    },
    deletePost (postID) {
      this.$fire.firestore
        .collection('blog')
        .doc(postID)
        .delete()
        .then(() => {
          this.$router.go('/dashboard')
        })
    }
  }
}
</script>
