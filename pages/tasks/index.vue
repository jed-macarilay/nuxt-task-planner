<template>
  <div class="h-full md:px-[25rem] md:pt-[5rem] p-[1rem] text-gray-700">
    <section class="flex flex-row mb-5">
      <h1 class="text-4xl w-full mb-5">Task Planner</h1>
      <div class="w-auto flex flex-row gap-x-2 mx-auto text-right">
        <div class="flex flex-row gap-2"><p>All</p> <span>{{ allTaskCount }}</span></div>
        <div class="flex flex-row gap-2"><p>Important</p> <span>{{ allImportantTaskCount }}</span></div>
        <div class="flex flex-row gap-2"><p>Done</p> <span>{{ allDoneTasksCount }}</span></div>
      </div>
    </section>

    <form @submit.prevent="searchTasks(taskSearch)">
      <label class="relative block mb-5">
        <span class="absolute inset-y-0 left-0 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </span>
        <input
          v-model="taskSearch"
          class="block bg-white w-full border border-slate-300 py-2 pl-9 px-3 shadow-sm rounded-full" 
          placeholder="Search" 
          type="text"
        />
      </label>
    </form>
    
    <ul class="h-[65vh] overflow-y-auto">
      <li
        v-for="task in tasks"
        class="h-16 w-full flex flex-row p-4 bg-white border border-white rounded-lg shadow-md break-words overflow-y-auto mb-3"
      >
        <TaskItem
          :task="task"
          @set-done="markAsDone"
          @set-important="maskAsImportant"
          @delete-task="removeTask"
        />
      </li>
    </ul>
    
    <footer>
      <form class="absolute bottom-0 pb-5" @submit.prevent="createTask">
        <label class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
        <input
          v-model="taskTitle"
          class="block md:w-[60vw] bg-white border border-slate-300 py-2 pl-9 pr-3 shadow-sm rounded-md" 
          placeholder="Add Task" 
          type="text"
        />
      </label>
      <span>Please enter to add task</span>
      </form>
    </footer>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import TaskItem from '~/components/TaskItem.vue'

  const taskTitle = ref('')
  const taskSearch = ref('')

  const {
    tasks,
    fetchTasks,
    searchTasks,
    addTasks,
    updateTasks,
    deleteTasks,
  } = useTasks()

  const allTaskCount = computed(() => tasks.value.length)

  const allImportantTaskCount = computed(() => {
    const filtered = tasks.value.filter(task => task.is_important)

    return filtered.length
  })

  const allDoneTasksCount = computed(() => {
    const filtered = tasks.value.filter(task => task.is_done)

    return filtered.length
  })

  function createTask() {
    addTasks({
      title: taskTitle.value
    })

    taskTitle.value = ''
  }

  function markAsDone(task) {
    updateTasks({
      id: task.id,
      title: task.title,
      is_important: task.is_important,
      is_done: task.is_done
    })
  }

  function maskAsImportant(task) {
    updateTasks({
      id: task.id,
      title: task.title,
      is_important: true,
      is_done: task.is_done
    })
  }

  function removeTask(id) {
    deleteTasks(id)
  }


  onMounted(() => {
    fetchTasks()
  })
</script>