export const ENV = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    PUBLIC_VAPID: import.meta.env.VITE_PUBLIC_VAPIC
}

// Validate
Object.entries(ENV).forEach(([key, value]) => {
    if(!value) {
        throw new Error(`Missing env variabel: ${key}`)
    }
})