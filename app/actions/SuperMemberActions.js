/**
 * Created by apache on 16-4-8.
 */
import alt from '../alt';

class SuperMemberActions {
    constructor() {
        this.generateActions(
            'getMemberSuccess'
        );
    }

    getMember(domain) {

        $.ajax({
            url : '/api/member/'+domain,
            type : 'get',
            contentType : 'application/json;charset=utf-8',
            cache : true,
            timeOut : 10000
        }).done((data) => {
            console.log(data);
            this.actions.getMemberSuccess(data);
        }).fail(() => {
            toastr.warning('获取失败');
        });
    }
}

export default alt.createActions(SuperMemberActions);