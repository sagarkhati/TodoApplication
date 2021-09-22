import React, { Component } from 'react'
import moment from 'moment'

import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class ListTodosComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todos: 
            [
                // {id: 1, description: 'Learn React', done: false, targetDate: new Date()},
                // {id: 2, description: 'Learn React', done: false, targetDate: new Date()},
                // {id: 3, description: 'Learn React', done: false, targetDate: new Date()},
                // {id: 4, description: 'Learn React', done: false, targetDate: new Date()},
            ],
            message: null
        }

        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                // console.log(response)
                this.setState({
                    todos: response.data 
                })
            }
        )
        .catch(
            response => {
                this.setState({
                    message: `NO RECORDS PRESENT`
                })
            }
        )
    } 

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <div className="container">
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>is Compeleted?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate.toString()).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-danger" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
                </div>
            </div>
        )
    }

    addTodoClicked() {
        this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id) {
        console.log("update "+id)
        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getLoggedInUserName()
        // // console.log(id+" "+username)
        // TodoDataService.deleteTodo(username, id)
        // .then(
        //     response => {
        //         this.setState({
        //             message: `Delete of todo ${id} successful`
        //         })
        //         this.refreshTodos()
        //     }
        // )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        // console.log(id+" "+username)
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({
                    message: `Delete of todo ${id} successful`
                })
                this.refreshTodos()
            }
        )
    }
}

export default ListTodosComponent