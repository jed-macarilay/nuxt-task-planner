export default function useTasks() {
  const tasks = useState('tasks', () => [])

  async function fetchTasks() {
    try {
      const response = await $fetch('https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks')
        
      tasks.value = response
    } catch (error) {
      return error
    }
  }

  async function searchTasks(query) {
    try {
      const response = await $fetch(`https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks?search=${query}`)
        
      tasks.value = response
    } catch (error) {
      return error
    }
  }
  
  async function addTasks(request) {
    try {
      await $fetch('https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks', {
        method: 'POST',
        body: {
          title: request.title,
        }
      })

      fetchTasks()
    } catch (error) {
      return error
    }
  }

  async function updateTasks(request) {
    try {
      await $fetch(`https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks/${request.id}`, {
        method: 'PUT',
        body: {
          title: request.title,
          is_done: request.is_done,
          is_important: request.is_important,
        }
      })

      fetchTasks()
    } catch (error) {
      return error
    }
  }

  async function deleteTasks(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await $fetch(`https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks/${id}`, {
          method: 'DELETE'
        })
  
        fetchTasks()
      } catch (error) {
        return error
      }
    }
  }

  return {
    tasks,
    fetchTasks,
    searchTasks,
    addTasks,
    updateTasks,
    deleteTasks,
  }
}