import React, { Component } from 'react';
import './Login.css';
import bankLogo from './communityBank.svg'
export default class Login extends Component {
    render () {
        console.log(process.env.REACT_APP_LOGIN);
        return (
            <div className="App">
                <img src={bankLogo} alt="LOLOLOLOLOLOLOLOLOLOL>OLOLOLOLOLOLOLOLOLOLOLOLOOL" />
                <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
            </div>
        );
    }
}