/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';
import SuperArticleActions from '../actions/SuperArticleActions';
import React from 'react';

class SuperArticleStore {
    constructor() {
        this.bindActions(SuperArticleActions);
        this.list = [];
    }

    onGetArticlesSuccess(data) {
        console.log(data);
        this.list = data.raw._raw;
    }

    onGetArticlesFail() {

    }

    onDeleteSuccess(raw) {
        let data = raw.data,
            _id = raw._id;
        if(data.code === 200) {
            var mutexIndex = -1;
            for(var i = 0, len = this.list.length; i < len; i++) {
                if(this.list[i].data._id === _id) {
                    mutexIndex = i;
                    break;
                }
            }
            if(mutexIndex !== -1) {
                this.list = React.addons.update(this.list,{$splice : [[mutexIndex,1]]});
            }
        } else {
            this.onDeleteFail(data.code);
        }
    }

    onDeleteFail(code) {
        if(code === 406) {
            toastr.warning('你还么登陆');
        } else {
            toastr.error('无法删除');
        }
    }

    onTopArticleSuccess(data) {
        if(data.code === 200) {
            var mutexIndex = -1,
                oldVal = false;
            for(var i = 0,len = this.list.length; i < len; i++) {
                if(this.list[i].data._id === data._id) {
                    mutexIndex = i;
                    oldVal = this.list[i].data.sticky;
                    break;
                }
            }
            var updateItem = React.addons.update(this.list[mutexIndex],{data : {sticky : {$set : !oldVal}}});
            this.list = React.addons.update(this.list,{$splice: [[mutexIndex,1,updateItem]]});

            toastr.success(data.meta);
        } else {
            toastr.warning(data.meta);
        }
    }
}

export default alt.createStore(SuperArticleStore);