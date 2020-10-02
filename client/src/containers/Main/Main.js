import React, { Component } from 'react';
import UserPart from './UserPart';
import SearchPart from './SearchPart';
import './Main.css';

class Main extends Component {

    render() {
        return (
            <div className="row m-2">
                <UserPart />
                <SearchPart />
            </div>
        );
    }
}

export default Main;
