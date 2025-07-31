import type {Ref} from 'vue'
import {computed, ref} from 'vue'
import type {User} from '@interfaces/interfaces.ts'

const _user: Ref<User | null> = ref(null)

export function useUser() {
  // Actions
  const isLoggedIn = computed(() => _user.value !== null)
  const clearUser = (): void => {
    _user.value = null
  }

  // Setters
  const setUser = (newUser: User): void => {
    _user.value = newUser
  }

  // Getters
  const userName = computed(() => _user.value?.name || '')
  const userEmail = computed(() => _user.value?.email || '')

  return { setUser, isLoggedIn, clearUser, userName, userEmail }
}
