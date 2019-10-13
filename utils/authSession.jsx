// utils/authSession.js
export default class authSession {
    constructor(domain) {
        this.domain = domain || 'http://localhost:3000'
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(token) {
        this.setToken(token)
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token // && !isTokenExpired(token) // handwaiving here
    }

    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }

    setSecretKey(key) {
        // Saves user token to localStorage
        localStorage.setItem('secretKey', key)
    }
    getSecretKey(key) {
        // Saves user token to localStorage
        return localStorage.getItem('secretKey')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
    }
}