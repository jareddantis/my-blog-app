<template>
  <div class="bg-white w-full">
    <!-- Navbar -->
    <NavigationBar :is-dashboard="isDashboard" />

    <!-- Main content -->
    <div
      class="max-w-xl w-full mx-auto py-3 px-6"
      :class="smallWidth ? 'md:max-w-2xl' : 'md:max-w-6xl'"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'

export default {
  name: 'DefaultPage',
  components: { NavigationBar },
  props: {
    isDashboard: {
      type: Boolean,
      default: false
    },
    smallWidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>
