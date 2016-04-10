/**
 * Created by apache on 16-4-10.
 */
import React from 'react/addons';
import MessageActions from '../actions/MessageActions';
import MessageStore from '../stores/MessageStore';
import _ from 'underscore';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = MessageStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        MessageStore.listen(this.onChange);
        MessageActions.getUser();
    }

    componentWillUnmount() {
        MessageStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    getUser() {
        $("#userlist").modal('show');
    }

    select(_id) {
        MessageActions.select(_id);
    }

    post() {
        MessageActions.postNotice(this.state.selectedList,this.state.content,this.state.selectAll);
    }

    render() {
        let UserList = null,
            selectedList = this.state.selectedList;
        if(this.loading) {
            UserList = (
                <div className="spinnerC">
                    <div className="bounce1"></div>
                    <div className="bounce1"></div>
                    <div className="bounce1"></div>
                </div>
            );
        } else if(this.state.list.length <= 0) {
            UserList = (
                <pre className="mon-notice">
                    <span className="fa fa-exclamation-triangle "></span>
                    <p>找不到匹配的选项</p>
                </pre>
            );
        } else {
            UserList = this.state.list.map((data) => {
                let selectClass = _.indexOf(selectedList,data._id) === -1 ? 'fa-plus-square' : 'fa-minus-square';
                return (
                    <li key={"user-"+data._id} className="mon-user-item">
                        <img src={data.avatar_url} alt="loading" width="40" height="40"/>
                        {data.username}
                        <span className={'fa pull-right ' + selectClass} onClick={this.select.bind(this,data._id)}></span>
                    </li>
                );
            });
        }

        return (
            <div>
                <p className="mon-bg-title mon-padding">
                    发送通知
                </p>


                <ul className="nav">
                    {UserList}
                </ul>

                <a href="javascript:void(0);" className="pull-right btn btn-success" onClick={this.getUser.bind(this)}>
                    确定
                </a>

                <div className="mon-select-all pull-right">
                    <input type="checkbox" name="all" onChange={MessageActions.selectAll}/> 全选
                </div>


                <div id="userlist" className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4>用户列表</h4>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <textarea name="content" className="form-control" value={this.state.content} onChange={MessageActions.changeContent} cols="30" rows="10"></textarea>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary pull-right" onClick={this.post.bind(this)} data-dismiss="modal" aria-label="Close">
                                    发送
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Message;