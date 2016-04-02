/**
 * Created by apache on 15-10-23.
 */
import React from 'react';
import {RouteHandler} from 'react-router';
import Nav from './Nav';

class App extends React.Component {
    render() {
        return (
            <div className="mon-app">
                <Nav />
                <RouteHandler />
            </div>
        );
    }
}

export default App;