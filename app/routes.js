/**
 * Created by apache on 15-10-23.
 */
import React from 'react';
import {Router,Route,DefaultRoute} from 'react-router';
import App from './components/App';
// 超级用户
import Super from './components/Super';
import SuperArticle from './components/SuperArticle';
import SuperUserControl from './components/SuperUserControl';
import Statistics from './components/Statistics';
import SuperMember from './components/SuperMember';

export default(
    <Route handler={App}>
        <Route path="/super" handler={Super}>
            <Route path="article" handler={SuperArticle} />
            <Route path="member" handler={SuperUserControl} />
            <Route path="user">
                <Route path=":domain" handler={SuperMember}/>
            </Route>
            <Route path="statistics" handler={Statistics}/>
            <Route path="search" handler={Statistics}/>
            <DefaultRoute handler={SuperArticle}/>
        </Route>
    </Route>
);
