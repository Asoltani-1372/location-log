import { createAuthClient } from 'better-auth/client'

const authClient = createAuthClient()

export const useAuthStore = defineStore('useAuthStore', () => {
  const loading = ref()

  async function signIn() {
    loading.value = true
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
      errorCallbackURL: '/error',
    })
    loading.value = true
  }
  return {
    loading,
    signIn,
  }
})
