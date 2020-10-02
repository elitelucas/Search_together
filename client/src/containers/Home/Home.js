import React, { Component } from 'react';
import logo from './logo.png';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import './Home.css';

class Home extends Component {

    goto_main = () => {
        if (this.props.isAuthenticated === true)
            window.location.href = '/search_together'
        else
            this.props.history.push('/login')
    }

    render() {
        return (
            <div className="container" style={{ textAlign: "center" }}>
                <br />
                <br />
                <br />
                <SearchBar />
                <br />
                <div>
                    <section>
                        <img src={logo} width="700" height="400" className="App-logo" alt="logo" onClick={this.goto_main} />
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.users.isAuthenticated
    };
};
export default connect(mapStateToProps)(Home);
