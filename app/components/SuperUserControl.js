/**
 * Created by apache on 16-4-1.
 */
import React from 'react';
import {Link} from 'react-router';
import SuperUserControlActions from '../actions/SuperUserControlActions';
import SuperUserControlStore from '../stores/SuperUserControlStore';
let config = require('../config');

class SuperUserControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = SuperUserControlStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SuperUserControlStore.listen(this.onChange);
        SuperUserControlActions.getUsers();
    }

    componentWillUnmount() {
        SuperUserControlStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleClick() {
        $(".mon-canvas").css('transform','translateX(100%)');
    }

    render() {
        let UserList = null;

        if(this.state.list.length > 0) {
            UserList = this.state.list.map((data) => {
                return (
                    <li key={data._id} className="animated fadeIn mon-user-control">
                        <Link to={"/super/member/"+data.domain}>
                            <img src={data.avatar_url} alt="loading"/>
                            {data.username}
                        </Link>
                    </li>
                );
            });
        }

        return (
            <div className="animated fadeIn">
                <div className="mon-user-block">
                    <div className="mon-user-close">
                        <p className="mon-padding-title">
                            用户
                        </p>
                        <span className="fa fa-times" onClick={this.handleClick.bind(this)}></span>
                    </div>
                    <div className="mon-user-search">
                        <label htmlFor="search">
                            <span className="fa fa-search"></span>
                        </label>
                        <input id="search" className="form-control" type="text"/>
                    </div>
                </div>
                <ul className="nav">
                    {UserList}
                </ul>

            </div>
        );
    }
}

export default SuperUserControl;