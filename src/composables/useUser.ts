import type {Ref} from 'vue'
import {computed, ref} from 'vue'
import type {User} from '@interfaces/users.ts'

const user: Ref<User | null> = ref(null)

export function useUser() {
  // Actions
  const isLoggedIn = computed(() => user.value !== null)
  const clearUser = (): void => {
    user.value = null
  }

  // Setters
  const setUser = (newUser: User): void => {
    user.value = newUser
  }

  // Getters
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')
  const getUserId = (): number | undefined => {
    return user.value?.id
  }

  return { setUser, isLoggedIn, clearUser, userName, userEmail, getUserId }
}
