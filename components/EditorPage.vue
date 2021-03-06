<template>
  <DefaultPage is-dashboard small-width>
    <h1 class="md:text-6xl text-4xl text-center font-bold mb-16">
      {{ pageTitle }}
    </h1>

    <!-- Loading spinner -->
    <div
      v-show="isLoading"
      class="w-full flex flex-row justify-center items-center"
    >
      <SimpleSpinner />
    </div>

    <!-- Post editor -->
    <div v-show="!isLoading" class="mb-8">
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
      v-show="!isLoading"
      :button-style="'bg-teal-500 rounded-md p-3 w-full text-white font-bold hover:bg-teal-700 cursor-pointer'"
      :spinning="isSubmitting"
      @click="emitSubmitEvent()"
    >
      {{ submitButtonText }}
    </SpinnerButton>
  </DefaultPage>
</template>

<script>
import DefaultPage from '~/components/DefaultPage.vue'
import SimpleSpinner from '~/components/SimpleSpinner.vue'
import SpinnerButton from '~/components/SpinnerButton.vue'

export default {
  name: 'EditorPage',
  components: {
    DefaultPage,
    SimpleSpinner,
    SpinnerButton
  },
  props: {
    pageTitle: {
      type: String,
      default: 'Create post'
    },
    submitButtonText: {
      type: String,
      default: 'Publish'
    },
    initialTitle: {
      type: String,
      default: ''
    },
    initialContent: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    isSubmitting: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  watch: {
    initialTitle (newTitle) {
      this.title = newTitle
    },
    initialContent (newContent) {
      this.content = newContent
    }
  },
  methods: {
    emitSubmitEvent () {
      this.$emit('submit', {
        title: this.title,
        content: this.content
      })
    }
  }
}
</script>
