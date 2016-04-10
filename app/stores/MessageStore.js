/**
 * Created by apache on 16-4-10.
 */
import alt from '../alt';
import MessageActions from '../actions/MessageActions';
import React from 'react/addons';

class MessageStore {
    constructor() {
        this.bindActions(MessageActions);
        this.list = [];
        this.selectedList = [];
        this.selectAll = false;
        this.content = '';
        this.loading = false;
    }

    onGetUserSuccess(data) {
        this.loading = true;
        if(data.code === 200) {
            this.list = data.raw;
        } else {
            toastr.warning(data.meta);
        }
    }

    onPostNoticeSuccess(data) {
        if(data.code === 200) {
            toastr.success(data.meta);
        } else {
            toastr.warning(data.meta);
        }
    }

    onChangeContent(e) {
        this.content = e.target.value;
    }

    onSelectSuccess(_id) {
        let index = this.selectedList.indexOf(_id);
        if(index !== -1) {
            this.selectedList = React.addons.update(this.selectedList,{$splice : [[index,1]]});
        } else {
            this.selectedList = React.addons.update(this.selectedList,{$push : [_id]});
        }
    }

    onSelectAll(e) {
        console.log(this.selectAll);
        this.selectAll = !this.selectAll;
    }
}

export default alt.createStore(MessageStore);