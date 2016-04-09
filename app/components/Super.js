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
                        <ul className="nav">
                            <li>
                                <Link to="/super">
                                    通知
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