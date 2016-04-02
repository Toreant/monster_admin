/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';

class SuperActions {
    constructor() {
        this.generateActions(
            'signOutSuccess',
            'sessionSuccess',
            'sessionFail'
        );
    }

    checkSession() {
        $.ajax({
            url : '/api/session',
            type : 'post',
            contentType : 'application/json;charset=utf-8'
        }).done((data) => {
            this.actions.sessionSuccess(data);
        }).fail(() => {
           this.actions.sessionFail();
        });
    }

    signOut() {
        $.ajax({
            url : '/api/signout',
            type : 'post',
            contentType : 'application/json;charset=utf-8'
        }).done((data) => {
            this.actions.signOutSuccess(data);
        }).fail(() => {
            toastr.warning('注销失败');
        });
    }
}

export default alt.createActions(SuperActions);