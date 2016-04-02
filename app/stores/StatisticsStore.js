/**
 * Created by apache on 16-4-2.
 */
import alt from '../alt';
import StatisticsActions from '../../../monster_admin/app/actions/StatisticsActions';

class StatisticsStore {
    constructor() {
        this.bindActions(StatisticsActions);
    }
}

export default alt.createStore(StatisticsStore);
