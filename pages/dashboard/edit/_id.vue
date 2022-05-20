<template>
  <EditorPage
    :is-loading="isLoading"
    :is-submitting="isSubmitting"
    :initial-title="initialTitle"
    :initial-content="initialContent"
    page-title="Edit post"
    submit-button-text="Save"
    @submit="onSubmit"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import EditorPage from '~/components/EditorPage.vue'

export default {
  name: 'EditPostPage',
  components: {
    EditorPage
  },
  computed: {
    ...mapGetters({
      userName: 'userName',
      userID: 'userID',
      userEmail: 'userEmail'
    })
  },
  data () {
    return {
      initialTitle: '',
      initialContent: '',
      isLoading: true,
      isSubmitting: false,
      postID: ''
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
            // Check if this user owns this post
            if (doc.data().author !== this.userID) {
              alert('You do not have permission to edit this post')
              this.$router.push('/dashboard')
              return
            }

            this.postID = postId
            this.initialTitle = doc.data().title
            this.initialContent = doc.data().content
            this.isLoading = false
          }
        })
    },
    onSubmit ({ title, content }) {
      this.isSubmitting = true

      // Can't save without author info
      if (!this.userName || !this.userEmail || !this.userID) {
        alert('You must be logged in to edit a post')
        return
      }

      // Save post in Cloud Firestore
      this.$fire.firestore
        .collection('blog')
        .doc(this.postID)
        .set({
          title,
          content,
          date: new Date(),
          author: this.userID
        })
        .then((docRef) => {
          // Redirect to post page
          this.$router.push('/post/' + this.postID)
        })
        .catch((error) => {
          alert(error)
          this.isSubmitting = false
        })
    }
  }
}
</script>
