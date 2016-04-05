/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';

class SuperArticleActions {
    constructor() {
        this.generateActions(
            'getArticlesSuccess',
            'getArticlesFail',
            'deleteSuccess',
            'deleteFail',
            'topArticleSuccess'
        );
    }

    getArticles(_skip,token) {
        let body = {
            option : {skip : (_skip-1)*6,limit : 6,sort : {create_time : -1}},
            token : token
        };

        $.ajax({
            url : '/api/articles',
            type : 'post',
            contentType : 'application/json;charset=utf-8',
            cache : false,
            data : JSON.stringify(body)
        }).done((data) => {
           this.actions.getArticlesSuccess(data);
        }).fail(() => {
            this.actions.getArticlesFail();
        });
    }

    deleteArticle(_id,token) {
        $.ajax({
            url : '/api/article/'+_id,
            type : 'delete',
            contentType : 'application/json;charset=utf-8',
            cache : false,
            headers: {
                'X-Auth-Token': token
            },
            dataType : 'json'
        }).done((data) => {
            console.log(data);
            this.actions.deleteSuccess({data: data, _id : _id});
        }).fail(() => {
            this.actions.deleteFail();
        })
    }

    topArticle(_id,stickied,token) {
        let type = stickied ? 'delete' : 'get';
        console.log(type);
        $.ajax({
            url : '/api/sticky/'+_id,
            type : type,
            cache : false,
            contentType : 'application/json;charset=utf-8'
        }).done((data) => {
            this.actions.topArticleSuccess(data);
        }).fail(() => {
            toastr.warning('操作失败');
        });
    }
}

export default alt.createActions(SuperArticleActions);