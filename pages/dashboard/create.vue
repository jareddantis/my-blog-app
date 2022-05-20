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
      userName: 'userName',
      userID: 'userID',
      userEmail: 'userEmail'
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
      const saveToFirestore = () => {
        // Save post in Cloud Firestore
        this.$fire.firestore
          .collection('blog')
          .add({
            author: this.userID,
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
