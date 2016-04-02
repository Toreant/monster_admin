/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';
import SuperUserControlActions from '../actions/SuperUserControlActions';

class SuperUserControlStore {
    constructor() {
        this.bindActions(SuperUserControlActions);
        this.list = [];
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
}

export default alt.createStore(SuperUserControlStore);