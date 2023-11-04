export default function useUsers() {
  const users = useState('users', () => [])

  async function fetchUsers() {
    try {
      const response = await $fetch('https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/users')

      users.value = response
    } catch (error) {
      return error
    }
  }

  return {
    users,
    fetchUsers,
  }
}