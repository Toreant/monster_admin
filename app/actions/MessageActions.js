/**
 * Created by apache on 16-4-10.
 */
import alt from '../alt';

class MessageActions {
    constructor() {
        this.generateActions(
            'postNoticeSuccess',
            'getUserSuccess',
            'changeContent',
            'selectSuccess',
            'selectAll'
        );
    }


    getUser(query) {
        $.ajax({
            url : '/api/users/search',
            type : 'post',
            dataType : 'json',
            contentType : 'application/json;charset=utf-8',
            data : JSON.stringify({params : query,option : {}})
        }).done((data) => {
            this.actions.getUserSuccess(data);
        }).fail(() => {
            toastr.warning('获取用户失败');
        })
    }

    postNotice(queryId,content,all) {
        console.log(all);

        let query = {};

        if(!all && Object.prototype.toString.call(queryId) === '[object Array]' && queryId.length > 0) {
            // 选中一批用户发送
            query._id = {$in : queryId};
        } else if(!all) {
            toastr.warning('你还没有选择用户');
            return;
        }

        $.ajax({
            url : '/api/notice/all',
            type : 'post',
            dataType : 'json',
            contentType : 'application/json;chatset=utf-8',
            cache : false,
            data : JSON.stringify(
                {query : query,content : {content : content,create_time : Date.now(),type : 0}}
            ),
            timeOut : 10000
        }).done((data) => {
            console.log(data);
            this.actions.postNoticeSuccess(data);
        }).fail(() => {
           toastr.warning('发送失败');
        });
    }

    select(_id) {
        setTimeout(() => {
            this.actions.selectSuccess(_id);
        },50);
    }
}

export default alt.createActions(MessageActions);