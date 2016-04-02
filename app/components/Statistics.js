/**
 * Created by apache on 16-4-2.
 */
import React from 'react';
import StatisticsActions from '../../../monster_admin/app/actions/StatisticsActions';
import StatisticsStore from '../stores/StatisticsStore';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = StatisticsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        StatisticsStore.listen(this.onChange);
    }

    componentWillUnmount() {
        StatisticsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        return (
            <p className="mon-bg-title mon-padding">
                统计
            </p>
        );
    }
}

export default Statistics;