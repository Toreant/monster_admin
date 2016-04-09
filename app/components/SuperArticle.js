/**
 * Created by apache on 16-4-1.
 */
import React from 'react/addons';
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

    search(value,type) {
        SuperArticleActions.setLoading();
        SuperArticleActions.search(value,type);
    }

    defaultSearch(e,value,type) {
        if(e.keyCode === 13) {
            this.search(this.state.searchValue,'title');
        }
    }

    render() {
        let ArticleList;
        let cs = React.addons.classSet;
        let searchClass = this.state.searchValue !== '' ? 'mon-search-result' : 'mon-search-o-result';
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
        } else if(this.state.loading) {
            ArticleList = (
                <div className='loader-inner line-scale-pulse-out mon-loader-o mon-loader-bg'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            );
        } else {
            ArticleList = (
                <p key="yudha034379847839974hd" className="bg-danger mon-padding">
                    没有数据了
                </p>
            );
        }


        return (
            <div>
                <div className="mon-article-search">
                    <div className="mon-search-block">
                        <label htmlFor="article-search" className="fa fa-search">
                        </label>
                        <input id="article-search" className="form-control" onChange={SuperArticleActions.changeSearchSuccess} onKeyDown={this.defaultSearch.bind(this)} type="text" placeholder="输入关键字，题目或标签"/>
                    </div>
                    <div id="search-result" className={searchClass}>
                        <ul className="nav">
                            <li>
                                <a href="javascript:void(0);" onClick={this.search.bind(this,this.state.searchValue,'title')}>
                                    文章标题中查找“{this.state.searchValue}"
                                </a>
                                <a href="javascript:void(0);" onClick={this.search.bind(this,this.state.searchValue,'tag')}>
                                    文章标签中查找“{this.state.searchValue}"
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {ArticleList}
                <UpdateBlock />
            </div>
        );
    }
}

export default SuperArticle;