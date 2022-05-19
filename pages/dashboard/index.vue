<template>
  <div class="bg-white w-full">
    <!-- Navbar -->
    <NavigationBar is-dashboard />

    <!-- Main content -->
    <div class="md:max-w-6xl max-w-xl w-full mx-auto py-3 px-6">
      <h1 class="md:text-6xl text-4xl font-bold mb-16">
        Your entries
      </h1>

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
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardIndexPage'
}
</script>
