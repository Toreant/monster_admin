/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';

class SuperUserControlActions {
    constructor() {
        this.generateActions(
            'getUsersSuccess',
            'getUsersFail',
            'changeSearch',
            'searchUserSuccess',
            'banSuccess'
        );
    }

    getUsers(_skip) {

        $.ajax({
            url : '/api/users/'+(_skip || 0),
            type : 'get',
            dataType : 'json',
            cache : false
        }).done((data) => {
            console.log(data);
            this.actions.getUsersSuccess(data);
        }).fail(() => {
            this.actions.getUsersFail();
        });
    }

    ban(_id,banned) {

        $.ajax({
            url : '/api/member/ban',
            type : 'post',
            dataType : 'json',
            contentType : 'application/json;charset=utf-8',
            cache : true,
            timeOut : 10000,
            data : JSON.stringify({
                _id : _id,
                ban : !banned
            })
        }).done((data) => {
            this.actions.banSuccess(data);
        }).fail(() => {
           toastr.warning('操作失败');
        });
    }

    deleteMember(_id) {

    }

    search(value,type) {
        let params = {};
        params[type] = value;

        $.ajax({
            url : '/api/users/search',
            type : 'post',
            dataType : 'json',
            contentType : 'application/json;charset=utf-8',
            cache : true,
            timeOut : 10000,
            data : JSON.stringify({params : params,option : {}})
        }).done((data) => {
            console.log(data);
            this.actions.searchUserSuccess(data);
        }).fail(() => {
            toastr.warning('查询失败')
        });

        $("#search-users").removeClass('mon-search-result').addClass('mon-search-o-result');
    }
}

export default alt.createActions(SuperUserControlActions);