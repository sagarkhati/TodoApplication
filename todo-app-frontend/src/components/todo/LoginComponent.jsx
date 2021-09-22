import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            username: 'sagarkhati',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
            
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>

                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} />
                        <ShowLoginsuccessMessage showSuccessMessage={this.state.showSuccessMessage} /> */}

                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}   
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                </div>
            </div>
        )
    }

    // handleUsernameChange(event) {
    //     console.log(event.target.name);
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // }

    // handlePasswordChange(event) {
    //     // console.log(event.target.value);
    //     this.setState({
    //         password: event.target.value
    //     });
    // }

    handleChange(event) {
        // console.log(this.state);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked() {
        // console.log("clicked");
        // if(this.state.username==='sagarkhati' && this.state.password==='dummy') {
        //     // this.setState({
        //     //     hasLoginFailed: false,
        //     //     showSuccessMessage: true
        //     // });

        //     AuthenticationService.registerSuccessfullLogin(this.state.username, this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // }
        // else {
        //     this.setState({
        //         hasLoginFailed: true,
        //         showSuccessMessage: false
        //     })
        // }

        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        // .then( () => {
        //     AuthenticationService.registerSuccessfullLogin(this.state.username, this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        // })
        // .catch( () => {
        //     this.setState({
        //         hasLoginFailed: true,
        //         showSuccessMessage: false
        //     })
        // })

        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then( (response) => {
            AuthenticationService.registerSuccessfullLoginForJwt(this.state.username, response.data.token)
            this.props.history.push(`/welcome/${this.state.username}`)
        })
        .catch( (response) => {
            console.log(response)
            this.setState({
                hasLoginFailed: true,
                showSuccessMessage: false
            })
        })


    }
    
}

// function ShowInvalidCredentials(props) {
//     if(props.hasLoginFailed)
//     return <div>Invalid Credentials</div>

//     return null
// }

// function ShowLoginsuccessMessage(props) {
//     if(props.showSuccessMessage)
//     return <div>Login Successful</div>

//     return null
// }

export default LoginComponent