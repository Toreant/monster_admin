/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';
import SuperUserControlActions from '../actions/SuperUserControlActions';
import React from 'react';

class SuperUserControlStore {
    constructor() {
        this.bindActions(SuperUserControlActions);
        this.list = [];
        this.loading = false;
        this.searchValue = '';
    }

    onGetUsersSuccess(data) {
        console.log(data);
        if(data.code == 200) {
            this.list = data.raw;
        } else {
            this.onGetUsersFail(data.code);
        }
    }

    onGetUsersFail(code) {
        if(code == 500) {
            toastr.error('服务器错误');
        } else {
            toastr.warning('获取数据失败');
        }
    }

    onChangeSearch(e) {
        this.searchValue = e.target.value;
    }

    onSearchUserSuccess(data) {
        if(data.code === 500) {
            toastr.error(data.meta);
        } else if(data.code === 200) {
            this.list = React.addons.update(this.list,{$set : data.raw});
        }
    }

    onBanSuccess(data) {
        console.log(data);
        if(data.code === 200) {
            let index = -1;
            for(let i = 0, num = this.list.length; i < num; i++) {
                if(this.list[i]._id === data._id) {
                    index = i;
                    break;
                }
            }

            if(index !== -1) {
                console.log("eehh");
                this.newItem = React.addons.update(this.list[index],{ban : {$set : data.ban}});

                this.list = React.addons.update(this.list,{$splice : [[index,1,this.newItem]]});
            } else {
                toastr.warning('找不到这个人');
            }

        } else {
            toastr.warning(data.meta);
        }
    }
}

export default alt.createStore(SuperUserControlStore);