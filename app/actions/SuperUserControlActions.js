/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';

class SuperUserControlActions {
    constructor() {
        this.generateActions(
            'getUsersSuccess',
            'getUsersFail'
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
}

export default alt.createActions(SuperUserControlActions);