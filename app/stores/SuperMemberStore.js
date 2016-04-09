/**
 * Created by apache on 16-4-8.
 */
import alt from '../alt';
import SuperMemberActions from '../actions/SuperMemberActions';

class SuperMemberStore {
    constructor() {
        this.bindActions(SuperMemberActions);
        this.avatar = "";
        this.name = "";
        this.domain = "";
        this._id = "";
        this.loading = true;
    }

    onGetMemberSuccess(data) {
        this.loading = false;
        if(data.code === 200) {
            let member = data.raw._raw;
            this._id = member._id;
            this.avatar = member.avatar_url;
            this.domain = member.domain;
            this.username = member.username;
        } else {
            toastr.warning(data.meta);
        }
    }
}

export default alt.createStore(SuperMemberStore);