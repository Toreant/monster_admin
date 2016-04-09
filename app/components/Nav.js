/**
 * Created by apache on 15-10-23.
 */
import React from 'react';
import {Link} from 'react-router';
import NavActions from '../actions/NavActions';
import NavStore from '../stores/NavStore';
import NoticePoint from './NoticePoint';
import config from '../config';

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = NavStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        NavStore.listen(this.onChange);
        //NavActions.checkLogin();
        NavActions.getProfile();
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

    handleClick() {
        $(".mon-canvas").css('transform','translateX(0)');
    }

    render() {
        return (
            <nav className='navbar navbar-default navbar-fixed-top mon-nav' id='mon-fixed-nav'>
                <div>
                    <div className='collapse navbar-collapse mon-nav' id='my-nav'>
                        <ul className='nav navbar-nav'>
                            <li><a href={config.url}>monster</a></li>
                            <li><a href={config.url + "articles"}>文章</a></li>
                            <ul className="nav navbar-nav navbar-right mon-subnav">
                                <li>
                                    <Link to="/super/search">
                                        <span className="fa fa-search"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/super/center">
                                        <span className="fa fa-home"></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/super/article">
                                        <span className="fa fa-book"></span>
                                    </Link>
                                </li>
                                <li>
                                    <a onClick={this.handleClick.bind(this)}>
                                        <span className="fa fa-users"></span>
                                    </a>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="mon-user-nav dropdown-toggle"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <img src={this.state.avatar || '/img/default.png'} alt="loading" width="30" height="30"/>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">设置</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li><a href="#">退出</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;

