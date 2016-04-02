/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';
import SuperArticleActions from '../actions/SuperArticleActions';

class SuperArticleStore {
    constructor() {
        this.bindActions(SuperArticleActions);
        this.list = [];
    }

    onGetArticlesSuccess(data) {
        console.log(data);
        this.list = data.raw._raw;
    }

    onGetArticlesFail() {

    }

    onDeleteSuccess(raw) {
        let data = raw.data,
            _id = raw._id;
        if(data.code === 200) {
            $("#article"+_id).fadeOut(function() {
                $(this).remove();
            });
        } else {
            this.onDeleteFail(data.code);
        }
    }

    onDeleteFail(code) {
        if(code === 406) {
            toastr.warning('你还么登陆');
        } else {
            toastr.error('无法删除');
        }
    }
}

export default alt.createStore(SuperArticleStore);