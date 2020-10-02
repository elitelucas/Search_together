import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogoutRequest } from '../../store/actions/usersActions';
import HeaderLink from './HeaderLink';

class NavigationBar extends Component {

    logout = () => {
        this.props.userLogoutRequest()
        this.props.history.push('/');
    }

    render() {
        const userLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-3 mt-4">
                    Welcome, {this.props.authenticatedUsername}!
                </li>
                <li className="nav-item">
                    <HeaderLink onClick={this.logout}>Logout</HeaderLink>
                </li>
            </ul>
        );
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-2">
                    <HeaderLink to="/login"><span>Login</span></HeaderLink>
                </li>
                <li className="nav-item">
                    <HeaderLink to="/signup"><span>Signup</span></HeaderLink>
                </li>
            </ul>
        );
    
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/'><h1 className="navbar-brand">minaSearch</h1></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavBar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="myNavBar">
                    {this.props.isAuthenticated ? userLinks : guestLinks}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.users.isAuthenticated,
        authenticatedUsername: state.users.authenticatedUsername
    };
}

const mapDispatchToProps = dispatch => {
    return {
        userLogoutRequest: () => dispatch(userLogoutRequest())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
