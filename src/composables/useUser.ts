import { computed, ref } from 'vue'

import type { Ref } from 'vue'
import type { User } from '@interfaces/users'

const user: Ref<User | null> = ref(null)

export function useUser() {
  const isLoggedIn = computed(() => user.value !== null)

  const clearUser = (): void => {
    user.value = null
  }

  const setUser = (newUser: User): void => {
    user.value = newUser
  }

  const userName = computed(() => user.value?.name || '')

  const userEmail = computed(() => user.value?.email || '')

  const userCreatedAt = computed(() => user.value?.created_at || '')

  const userUpdatedAt = computed(() => user.value?.updated_at || 'Nunca')

  const getUserId = (): number | undefined => {
    return user.value?.id
  }

  return { setUser, isLoggedIn, clearUser, userName, userEmail, userCreatedAt, userUpdatedAt, getUserId }
}
