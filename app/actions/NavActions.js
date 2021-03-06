/**
 * Created by apache on 15-10-25.
 */
import alt from '../alt';

class NavActions {
    constructor() {
        this.generateActions(
            'changeState',
            'checkLoginSuccess',
            'checkLoginFail',
            'signOutSuccess',
            'signOutFail',
            'getProfileLocal',
            'searchSuccess',
            'changeSearch',
            'setProfileLocal'
        );
    }

    checkLogin() {
        let sessionStorage = window.sessionStorage,
            userProfile = sessionStorage.getItem('profile');
        let localStorage = window.localStorage,
            localProfile = JSON.parse(localStorage.getItem('user'));

        if(userProfile !== null && localProfile !== null && userProfile !== '' && localProfile !== '' && userProfile._id === localProfile.data._id) {
            this.actions.getProfileLocal(userProfile);
        } else {
            $.ajax({
                url : '/api/session',
                cache : false,
                type : 'post',
                dataType : 'json'
            }).done((data) => {this.actions.checkLoginSuccess(data);})
                .fail((data) => {this.actions.checkLoginFail();});
        }
    }

    signOut() {
        $.ajax({
            url : '/api/signout',
            type : 'post',
            cache : false,
            dataType : 'json'
        }).done((data) => {this.actions.signOutSuccess(data);})
        .fail((data) => {this.actions.signOutFail();});
    }

    search(what) {
        $.ajax({
            url : '/api/search',
            dataType : 'json',
            contentType : 'application/json;charset=utf-8',
            cache : false,
            type : 'post',
            data : JSON.stringify({what : what,option : {skip : 0,limit : 10}})
        }).done((data) => {
            this.actions.searchSuccess(data);
        }).fail(() => {
            toastr.warning('网络有问题');
        });
    }

    getProfile() {
        let localStorage = window.localStorage;

        if(localStorage.getItem('profile') != null) {
            setTimeout(() => {
                this.actions.setProfileLocal(localStorage.getItem('profile'));
            },50);
        } else {
            $.ajax({
                url : '/api/session',
                type : 'post',
                contentType : 'application/json;charset=utf-8',
                timeOut: 10000
            }).done((data) => {
                this.actions.setProfileLocal(data.data);
            }).fail(() => {
                toastr.warning('获取信息失败');
            });
        }
    }
}

export default alt.createActions(NavActions);