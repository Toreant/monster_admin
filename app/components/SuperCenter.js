/**
 * Created by apache on 16-4-5.
 */
import React from 'react';
import {Link} from 'react-router';
import SuperCenterActions from '../actions/SuperUserControlActions';
import SuperCenterStore from '../stores/SuperCenterStore';

class SuperCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = SuperCenterStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SuperCenterStore.listen(this.onChange);
    }

    componentWillUnmount() {
        SuperCenterStore.unlisten(this.onChange);
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default SuperCenter;