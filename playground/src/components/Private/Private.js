import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from './../../ducks/user_reducer'
import './Private.css'

class Private extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         user: {}
    //     }
    // }
    componentDidMount(){
        this.props.getUserInfo();
    }
    render () {
        console.log(this.props.user)
        return (
            <div>
                <h1>Community Bank</h1>
                <div className='accountInfoContainer'>
                    <h4>Account Information:</h4>
                        {this.props.user ? <img className='avatar' src={this.props.user.img} alt='what a stupid face'/>: null}
                    <div>
                        {/* User Info here */}
                        <p>Username {this.props.user ? this.props.user.username: null}</p>
                        <p>Email {this.props.email ? this.props.user.username: null}</p>
                        <p>ID: {this.props.user ? this.props.user.id: null}</p>
                        <h4>Available Balance: {this.props.user ? '-$'+Math.floor(Math.random() *5000)+'.00': null}</h4>
                    </div>
                        {/* Login Button here */}
                        <a href={process.env.REACT_APP_LOGOUT}><button>Log out</button></a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

let outputActions = {
    getUserInfo: getUserInfo
}

export default connect(mapStateToProps, outputActions)(Private);