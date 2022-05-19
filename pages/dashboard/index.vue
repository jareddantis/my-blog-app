<template>
  <DefaultPage is-dashboard>
    <h1 class="md:text-6xl text-4xl text-center font-bold mb-16">
      Hi, {{ userName }}
    </h1>

    <!-- Post create button -->
    <nuxt-link to="/dashboard/create" class="no-underline">
      <button
        type="button"
        class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-bold rounded-lg text-md p-5 mx-auto mb-8 max-w-xs w-full block"
      >
        Create post
      </button>
    </nuxt-link>

    <!-- List of blog entries -->
    <div class="flex flex-row justify-between items-center w-full">
      <!-- Post title and date -->
      <div>
        <h3 class="font-bold text-2xl">
          Lorem ipsum dolor sit amet
        </h3>
        <p>May 21, 2022 &#8212; 10:23 AM</p>
      </div>

      <!-- Post controls -->
      <div class="shrink-0">
        <button
          type="button"
          class="text-white bg-teal-600 hover:bg-teal-800 border-2 border-teal-600 hover:border-teal-800 focus:ring-4 focus:ring-teal-300 font-bold rounded-lg text-sm px-5 py-2.5 mr-3"
        >
          Edit
        </button>
        <button
          type="button"
          class="text-red-600 bg-white border-2 border-red-600 hover:border-red-800 focus:ring-4 focus:ring-red-300 hover:text-red-800 font-bold rounded-lg text-sm px-5 py-2.5"
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

export default {
  name: 'DashboardIndexPage',
  computed: {
    ...mapGetters({
      userName: 'userName'
    })
  },
  components: { DefaultPage }
}
</script>
