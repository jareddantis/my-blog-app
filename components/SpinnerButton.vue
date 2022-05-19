<template>
  <button type="button" :class="actualStyle" @click="$emit('click')">
    <SimpleSpinner v-if="spinning" />
    <slot v-else />
  </button>
</template>

<script>
import SimpleSpinner from '~/components/Spinner.vue'

export default {
  name: 'SpinnerButton',
  components: { SimpleSpinner },
  props: {
    buttonStyle: {
      type: String,
      default:
        'bg-teal-500 rounded-md p-3 w-full text-white font-bold hover:bg-teal-700 cursor-pointer'
    },
    spinning: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    actualStyle () {
      const definedStyle = this.buttonStyle
      const spinningStyle = this.spinning
        ? 'flex justify-center items-center'
        : ''
      return `${definedStyle} ${spinningStyle}`
    }
  }
}
</script>
