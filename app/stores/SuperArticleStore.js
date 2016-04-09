/**
 * Created by apache on 16-4-1.
 */
import alt from '../alt';
import SuperArticleActions from '../actions/SuperArticleActions';
import React from 'react/addons';
import md from 'markdown';

class SuperArticleStore {
    constructor() {
        this.bindActions(SuperArticleActions);
        this.list = [];
        this.searchValue = "";
        this.loading = false;
    }

    onGetArticlesSuccess(data) {
        if(data.code === 200) {
            this.list = data.raw._raw;
        } else {
            toastr.warning(data.meta);
        }
    }

    onSearchArticleSuccess(data) {
        this.loading = false;
        if(data.code === 200) {
            this.list = React.addons.update(this.list,{$set : data.data._raw});
        } else {
            toastr.warning(data.meta);
        }
    }

    onGetArticlesFail() {
        toastr.warning('获取数据失败');
    }

    onDeleteSuccess(raw) {
        let data = raw.data,
            _id = raw._id;
        if(data.code === 200) {
            var mutexIndex = -1;
            for(var i = 0, len = this.list.length; i < len; i++) {
                if(this.list[i].data._id === _id) {
                    mutexIndex = i;
                    break;
                }
            }
            if(mutexIndex !== -1) {
                this.list = React.addons.update(this.list,{$splice : [[mutexIndex,1]]});
            }
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

    onTopArticleSuccess(data) {
        if(data.code === 200) {
            var mutexIndex = -1,
                oldVal = false;
            for(var i = 0,len = this.list.length; i < len; i++) {
                if(this.list[i].data._id === data._id) {
                    mutexIndex = i;
                    oldVal = this.list[i].data.sticky;
                    break;
                }
            }
            var updateItem = React.addons.update(this.list[mutexIndex],{data : {sticky : {$set : !oldVal}}});
            this.list = React.addons.update(this.list,{$splice: [[mutexIndex,1,updateItem]]});

            toastr.success(data.meta);
        } else {
            toastr.warning(data.meta);
        }
    }

    onGetSuccess(data) {

        if(data.code === 200) {
            let target = data.raw.article;
            let $updateModal = $("#updateModal");
            $updateModal.on('show.bs.modal',function(event) {
                var modal = $(this),
                    tags = target.tags.toString().replace(/,/g,' ');
                modal.find("input[name='title']").val(target.title);
                modal.find("textarea[name='summary']").val(target.summary);
                modal.find("input[name='tag']").val(tags);
                modal.find("textarea[name='content']").val(target.content);
                modal.find("input[name='_id']").val(target._id);

                let markdown = md.markdown;
                $("#updateContent").markdown({
                    autofocus:false,
                    savable:false,
                    onPreview: function(e) {
                        var previewContent;

                        if (e.isDirty()) {
                            var originalContent = e.getContent();

                            previewContent = markdown.toHTML(originalContent);
                        } else {
                            previewContent = "写下你的大作吧！！！"
                        }
                        return previewContent;
                    }
                });
            });
            $updateModal.modal('show');
        } else {
            toastr.warning('获取数据失败');
        }
    }

    onChangeSearchSuccess(e) {
        this.searchValue = e.target.value;
    }

    onSetLoading() {
        this.loading = true;
    }
}

export default alt.createStore(SuperArticleStore);