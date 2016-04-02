/**
 * Created by apache on 16-4-1.
 */
import React from 'react';
import SuperActions from '../actions/SuperActions';
import SuperStore from '../stores/SuperStore';
import {RouteHandler,Link} from 'react-router';

class Super extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = SuperStore.getState();
    }

    componentDidMount() {
        SuperStore.listen(this.onChange);
        SuperActions.checkSession();
    }

    componentWillUnmount() {
        SuperStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
        let admin = sessionStorage.getItem('admin');
        if(admin != null) {
            admin = JSON.parse(admin);
            document.getElementById('admin-img').src = admin.data.avatar_url;
        }
    }

    signOut() {
        SuperActions.signOut();
    }

    render() {

        let Content = (
            <p>你还没登陆呢,2秒后正在跳转</p>
        );

        if(this.state.logined) {

            Content =  (
                <div className="mon-main mon-control">
                    <aside className="mon-fn">
                        <div className="mon-admin-user">
                            <img id="admin-img" src="/img/default.png" alt="loading"/>
                            <div className="btn-group">
                                <span className="fa fa-cog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
                                <ul className="dropdown-menu">
                                    <li><a href="#" onClick={this.signOut.bind(this)}><span className="fa fa-sign-out"></span>注销</a></li>
                                </ul>
                            </div>
                        </div>

                        <ul className="nav mon-ability-list">
                            <li>
                                <Link to="/super/center" className="">
                                    <span className="fa fa-home"></span>
                                    中　心
                                </Link>
                            </li>
                            <li>
                                <Link to="/super/article">
                                    <span className="fa fa-book"></span>
                                    文　章
                                </Link>
                            </li>
                            <li>
                                <Link to="/super/member">
                                    <span className="fa fa-user"></span>
                                    用　户
                                </Link>
                            </li>
                            <li>
                                <Link to="/super/statistics">
                                    <span className="fa fa-bar-chart"></span>
                                    统 计
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <span className="fa fa-chrome"></span>
                                    啥 の
                                </Link>
                            </li>
                        </ul>
                    </aside>
                    <div className="mon-block">
                        <RouteHandler />
                    </div>
                </div>
            );
        }

        return (
            <div className="super-main">
                {Content}
            </div>
        );
    }
}

export default Super;