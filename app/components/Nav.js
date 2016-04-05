/**
 * Created by apache on 15-10-23.
 */
import React from 'react';
import {Link} from 'react-router';
import NavActions from '../actions/NavActions';
import NavStore from '../stores/NavStore';
import NoticePoint from './NoticePoint';

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = NavStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        NavStore.listen(this.onChange);
        //NavActions.checkLogin();
    }

    componentWillUnmount() {
        NavStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    signOut() {
        NavActions.signOut();
    }

    search() {
        NavActions.search(this.state.search);
    }

    render() {
        return (
            <nav className='navbar navbar-default navbar-fixed-top mon-nav' id='mon-fixed-nav'>
                <div>
                    <div className='navbar-header'>
                        <button className='navbar-toggle collapsed' data-toggle='collapse' data-target='#my-nav'>
                            <span className='sr-only'>Toggle</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className='navbar-brand icon-name'>
                            Monster
                        </Link>
                    </div>
                    <div className='collapse navbar-collapse' id='my-nav'>
                        <ul className='nav navbar-nav'>
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/articles">文章</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;

