/**
 * Created by apache on 16-4-1.
 */
import React from 'react';
import {Link} from 'react-router';
import SuperArticleActions from '../actions/SuperArticleActions';
import SuperArticlesStore from '../stores/SuperArticleStore';
import UpdateBlock from './UpdateBlock';
let config = require('../config');

class SuperArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = SuperArticlesStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SuperArticlesStore.listen(this.onChange);
        SuperArticleActions.getArticles(1,'');
    }

    componentWillUnmount() {
        SuperArticlesStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    deleteArticle(_id) {
        SuperArticleActions.deleteArticle(_id,'');
    }

    topArticle(_id,sticky) {
        SuperArticleActions.topArticle(_id,sticky,'');
    }

    update(_id) {
        SuperArticleActions.get('article',_id);
    }

    render() {
        let ArticleList;
        if(this.state.list.length > 0) {
            ArticleList = this.state.list.map((data) => {
                return (
                    <div key={'article-'+data.data._id}  className="media mon-control-item animated fadeIn">
                        <div className="media-left">
                            <a href={config.url+'article/'+data.data._id} target="blank">
                                <img src={(config.url + data.data.abbreviations) || '/img/cover-night.png'} alt="loading" width="150" height="100"/>
                            </a>
                        </div>
                        <div className="media-body mon-article-control">
                            <div className="mon-ctrl-content">
                                <div>
                                    <a href={config.url+'article/'+data.data._id} target="blank">
                                        {data.data.title || '无'}
                                    </a>
                                    <p className="text-muted mon-follow-intr">
                                        简介：{data.data.introduce　|| '五'}
                                    </p>
                                </div>
                                <div>
                                    作者：<a href={config.url+'member/'+data.user.domain} target="blank">{data.user.username}</a>
                                    <div>
                                        浏览次数: {data.data.browser_count}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="mon-ctr-btn btn-danger" onClick={this.deleteArticle.bind(this,data.data._id)}>
                                    删除
                                </button>
                                <button className="mon-ctr-btn btn-success" onClick={this.topArticle.bind(this,data.data._id,data.data.sticky)}>
                                    {data.data.sticky ? "下放": "置顶"}
                                </button>
                                <button className="mon-ctr-btn btn-primary" onClick={this.update.bind(this,data.data._id)}>
                                    编辑
                                </button>
                            </div>
                        </div>


                    </div>
                );
            });
        } else {
            ArticleList = (
                <p key="yudha034379847839974hd" className="bg-danger mon-padding">
                    没有数据了
                </p>
            );
        }


        return (
            <div>
                <p className="mon-bg-title mon-padding-title">
                    文章管理
                </p>
                {ArticleList}
                <UpdateBlock />
            </div>
        );
    }
}

export default SuperArticle;