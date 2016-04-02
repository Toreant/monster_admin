/**
 * Created by apache on 15-10-22.
 */
import React from 'react';
import Router from 'react-router';
import routes from './routes';

Router.run(routes,Router.HistoryLocation,(Handler) =>{
    React.render(<Handler />,document.getElementById('app'));
});