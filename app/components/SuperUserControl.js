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

    ban(_id,banned) {
        SuperUserControlActions.ban(_id,banned);
    }

    deleteMember(_id) {

    }

    search(value,type) {
        SuperUserControlActions.search(value,type);
    }

    defaultSearch(e) {
        if(e.keyCode === 13) {
            if(this.state.searchValue !== '') {
                this.search(this.state.searchValue,'username');
            } else {
                SuperUserControlActions.getUsers();
            }
        }
    }

    render() {
        let UserList = null,
            searchClass = this.state.searchValue === '' ? 'mon-search-o-result': 'mon-search-result';

        if(this.state.list.length > 0) {
            UserList = this.state.list.map((data) => {
                return (
                    <div key={'member-'+data._id}  className="media mon-control-item animated fadeIn">
                        <div className="media-left">
                            <Link to={'/super/user/'+data.domain}>
                                <img src={(config.url + data.avatar_url) || '/img/cover-night.png'} alt="loading" width="100" height="100"/>
                            </Link>
                        </div>
                        <div className="media-body mon-article-control">
                            <div className="mon-ctrl-content">
                                <div>
                                    <Link to={'/super/user/'+data.domain} target="blank">
                                        {data.username || '无'}
                                    </Link>
                                    <p className="text-muted mon-follow-intr">
                                        简介：{data.introduce　|| '无'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button className="mon-ctr-btn btn-danger" onClick={this.deleteMember.bind(this,data._id)}>
                                    删除
                                </button>
                                <button className="mon-ctr-btn btn-success" onClick={this.ban.bind(this,data._id,data.ban)}>
                                    {data.ban ? "解禁": "禁言"}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            });
        } else if(this.state.loading) {
            UserList = (
                <div className='loader-inner line-scale-pulse-out mon-loader-o mon-loader-bg'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            );
        } else {
            UserList = (
                <pre className="mon-notice">
                    <span className="fa fa-exclamation-triangle "></span>
                    <p>找不到匹配的选项</p>
                </pre>
            );
        }

        return (
            <div>
                <div className="mon-search">
                    <div className="mon-search-block">
                        <label htmlFor="search-user" className="fa fa-search"></label>
                        <input id="search-user" className="form-control" value={this.searchValue} onChange={SuperUserControlActions.changeSearch} onKeyDown={this.defaultSearch.bind(this)} type="text" placeholder="输入关键字，姓名或邮箱"/>
                    </div>
                    <div id="search-users" className={searchClass}>
                        <ul className="nav">
                            <li>
                                <a href="javascript:void(0);" onClick={this.search.bind(this,this.state.searchValue,'username')}>
                                    <span className="fa fa-user mon-icon"></span>根据用户名“{this.state.searchValue}”查找
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);" onClick={this.search.bind(this,this.state.searchValue,'email')}>
                                    <span className="mon-icon">@</span>根据邮箱根据邮箱“{this.state.searchValue}”查找
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {UserList}
            </div>
        );
    }
}

export default SuperUserControl;