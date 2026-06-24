import axios from 'axios'

const API_URL = (
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'https://hashmil-muahmmed08-mindcare-backend.hf.space'
).replace(/\/+$/, '')

const API = axios.create({ baseURL: API_URL })

// Auto-attach JWT token
API.interceptors.request.use(config => {
    const token = localStorage.getItem('mindcare_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Handle 401
API.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            localStorage.removeItem('mindcare_token')
            localStorage.removeItem('mindcare_user')
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

export default API





