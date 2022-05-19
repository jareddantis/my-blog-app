<template>
  <DefaultPage is-dashboard small-width>
    <h1 class="md:text-6xl text-4xl text-center font-bold mb-16">
      Create post
    </h1>

    <!-- Post editor -->
    <div class="mb-8">
      <input
        v-model="title"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md mb-4"
        type="text"
        placeholder="Title"
      >
      <textarea
        v-model="content"
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
        placeholder="Write something..."
      />
    </div>

    <!-- Submit button -->
    <SpinnerButton
      :button-style="'bg-teal-500 rounded-md p-3 w-full text-white font-bold hover:bg-teal-700 cursor-pointer'"
      :spinning="isSubmitting"
      @click="onSubmit()"
    >
      Publish
    </SpinnerButton>
  </DefaultPage>
</template>

<script>
import { mapGetters } from 'vuex'
import DefaultPage from '~/components/DefaultPage.vue'
import SpinnerButton from '~/components/SpinnerButton.vue'

export default {
  name: 'CreatePostPage',
  components: {
    DefaultPage,
    SpinnerButton
  },
  computed: {
    ...mapGetters({
      userName: 'userName'
    })
  },
  data () {
    return {
      title: '',
      content: '',
      isSubmitting: false
    }
  },
  methods: {
    onSubmit () {
      this.isSubmitting = true

      // Can't save without an author ID
      if (!this.userName) {
        alert('You must be logged in to create a post')
        return
      }

      // Save post in Cloud Firestore
      this.$fire.firestore
        .collection('blog')
        .add({
          author: this.userName,
          title: this.title,
          content: this.content,
          date: new Date()
        })
        .then((docRef) => {
          // Redirect to post page
          this.$router.push('/post/' + docRef.id)
        })
        .catch((error) => {
          alert(error)
          this.isSubmitting = false
        })
    }
  }
}
</script>
