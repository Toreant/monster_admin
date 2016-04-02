/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';
import SuperActions from '../actions/SuperActions';

class SuperStore {
    constructor() {
        this.bindActions(SuperActions);
        this.logined = false;
    }

    onSignOutSuccess(data) {
        if(data.code === 200) {
            location.href = '/';
        } else {
            toastr.warning('注销失败');
        }
    }

    onSessionSuccess(data) {
        if(data.code === 200) {
            this.logined = true;
        } else {
            toastr.warning('你还没登陆呢');
            setTimeout(function() {
                location.href = '/login#login';
            },2000);
        }
    }

    onSessionFail() {
        location.href = '/login#login';
    }
}

export default alt.createStore(SuperStore);