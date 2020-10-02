import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Main from './containers/Main/Main';
import Signup from './containers/Users/Signup/Signup';
import Login from './containers/Users/Login/Login';
import NavigationBar from './containers/NavigationBar/NavigationBar';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <NavigationBar />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    {this.props.isAuthenticated && (
                        <Route path="/search_together" component={Main} />
                    )}                    
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.users.isAuthenticated
    };
};

export default connect(mapStateToProps)(App);
