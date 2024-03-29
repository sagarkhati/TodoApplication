import axios from "axios"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    // executeBasicAuthenticationService(username, password) {
    //     return axios.get('http://localhost:8080/basicauth', {
    //         headers: {
    //             authorization: this.createAuthToken(username, password)
    //         }
    //     })
    // }

    executeJwtAuthenticationService(username, password) {
        return axios.post('http://localhost:8080/authenticate', {username,password})
    }

    // createAuthToken(username, password) {
    //     return 'Basic ' + window.btoa(username + ":" + password)
    // }

    // registerSuccessfullLogin(username, password) {
    //     // console.log("register success")
    //     sessionStorage.setItem('authenticatedUser', username)
    // }

    // registerSuccessfullLogin(username, password ) {
    //     sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    //     this.setupAxiosInterceptors(this.createAuthToken(username, password))
    // }

    registerSuccessfullLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    createJwtToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null)
        return false

        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null)
        return ''

        return user
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {

                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }

                return config
            }
        )
    }
}

export default new AuthenticationService()