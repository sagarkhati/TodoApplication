import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import HelloWorldService from '../../api/todo/HelloWorldService';

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            welcomeMessage: ''
        }

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Click here <br />
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage() {
        // console.log("welcome");
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        // console.log(response)
        this.setState({
            // welcomeMessage: response.data
            welcomeMessage: response.data.message
        })
    }

    // handleError(error) {
    //     // console.log(error)
    //     this.setState({
    //         welcomeMessage: error.response.data.message
    //     })
    // }

    handleError(error) {
        
        let errorMessage = ''

        if(error.message)
            errorMessage += error.message

        if(error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({
            welcomeMessage: errorMessage
        })
    }

}

export default WelcomeComponent