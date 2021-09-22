import axios from "axios";

class TodoDataService {

    retrieveAllTodos(name) {
        // console.log("executeHelloWorldService");
        return axios.get(`http://localhost:8080/users/${name}/todos`)
    }

    retrieveTodo(name, id) {
        // console.log("executeHelloWorldService");
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
    }

    createTodo(name, todo) {
        return axios.put(`http://localhost:8080/users/${name}/todos`, todo)
    }

    updateTodo(name, id, todo) {
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo)
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`)
    }

}

export default new TodoDataService()