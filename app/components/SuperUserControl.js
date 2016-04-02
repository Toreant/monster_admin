/**
 * Created by apache on 16-4-1.
 */
import React from 'react';
import {Link} from 'react-router';
import SuperUserControlActions from '../../../monster_admin/app/actions/SuperUserControlActions';
import SuperUserControlStore from '../stores/SuperUserControlStore';

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

    render() {
        let UserList = null;

        if(this.state.list.length > 0) {
            UserList = this.state.list.map((data) => {
                return (
                    <div key={data._id} className="col-md-2 animated fadeIn mon-user-control">
                        <div>
                            <img src={data.avatar_url} alt="loading"/>
                            <div className="btn-group mon-setting">
                                <span className="fa fa-cog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
                                <ul className="dropdown-menu">
                                    <li><a href="#"><span className="fa fa-ban"></span>禁言</a></li>
                                    <li><a href="#"><span className="fa fa-envelope"></span>私信</a></li>
                                    <li><a href="#"><span className="fa fa-user-times"></span>删除</a></li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <Link to={"/member/"+data.domain}>
                                {data.username}
                            </Link>
                        </div>
                    </div>
                );
            });
        }

        return (
            <div>
                <p className="mon-bg-title mon-padding-title">
                    用户管理
                </p>
                {UserList}
            </div>
        );
    }
}

export default SuperUserControl;