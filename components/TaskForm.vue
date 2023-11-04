<template>
  <div class="md:w-1/2 text-left">
    <form @submit.prevent="createTask">
      <label class="relative block">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </span>
      <input 
        v-model="taskTitle"
        class="block w-full bg-white border border-slate-300 py-2 pl-9 pr-3 shadow-sm rounded-md" 
        type="text"
        :placeholder="inputPlaceholder"
        @focus="whenHover"
        @blur="whenHoverOut"
      />
    </label>
      <p>Please <span :class="inputClass">enter</span> to add task</p>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const taskTitle = ref('')
  
  const { addTasks } = useTasks()

  const inputClass = ref("text-pink-600")
  const inputPlaceholder = ref("What's your plan for today?")
  
  function whenHover() {
    inputClass.value = ""
    inputPlaceholder.value = 'Try typing "Submit report by 3 PM"'
  }

  function whenHoverOut() {
    inputClass.value = "text-pink-600"
    inputPlaceholder.value = "What's your plan for today?"
  }

  function createTask() {
    addTasks({
      title: taskTitle.value
    })

    navigateTo('/tasks')
  }
</script>