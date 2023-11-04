<template>
  <div class="flex flex-col md:items-center h-screen md:py-[15rem] p-[5vh] pt-[15rem] text-gray-700">
    <div class="text-center md:w-1/4 md:mb-[10vh] mb-[8vh]">
      <h1 class="text-3xl md:text-4xl mx-8 mb-3">Welcome to Task Planner</h1>
      <span>Get things done with your day, a list that refreshes every day.</span>
    </div>
    <TaskFormVue />
  </div>
</template>

<script setup>
  import TaskFormVue from '~/components/TaskForm.vue'
</script>