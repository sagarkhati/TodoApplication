import axios from "axios";

class HelloWorldService {

    executeHelloWorldService() {
        // console.log("executeHelloWorldService");
        return axios.get('http://localhost:8080/hello-world')
    }

    executeHelloWorldBeanService() {
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    // executeHelloWorldPathVariableService() {
    //     return axios.get('http://localhost:8080/hello-world/Sagar')
    // }

    executeHelloWorldPathVariableService(username) {

        // let username = 'sagarkhati'
        // let password = 'dummy'

        // let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password);

         return axios.get(`http://localhost:8080/hello-world/${username}`)

    }
}

export default new HelloWorldService()