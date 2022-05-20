<template>
  <EditorPage
    :is-submitting="isSubmitting"
    :is-loading="false"
    @submit="onSubmit"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import EditorPage from '~/components/EditorPage.vue'

export default {
  name: 'CreatePostPage',
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
      isSubmitting: false
    }
  },
  methods: {
    onSubmit ({ title, content }) {
      this.isSubmitting = true
      const saveToFirestore = () => {
        // Save post in Cloud Firestore
        this.$fire.firestore
          .collection('blog')
          .add({
            author: this.userID,
            title,
            content,
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

      // Can't save without author info
      if (!this.userName || !this.userEmail || !this.userID) {
        alert('You must be logged in to create a post')
        return
      }

      // Check if author already exists in author collection
      this.$fire.firestore
        .collection('authors')
        .where('email', '==', this.userEmail)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // Author doesn't exist, create it
            this.$fire.firestore
              .collection('authors')
              .doc(this.userID)
              .set({
                name: this.userName,
                email: this.userEmail
              })
              .then(() => {
                saveToFirestore()
              })
              .catch((error) => {
                alert(error)
                this.isSubmitting = false
              })
          } else {
            // Author exists, save post
            saveToFirestore()
          }
        })
        .catch((error) => {
          alert(error)
          this.isSubmitting = false
        })
    }
  }
}
</script>
