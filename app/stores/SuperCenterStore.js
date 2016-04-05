/**
 * Created by apache on 16-4-5.
 */
import alt from '../alt';
import SuperCenterActions from '../actions/SuperCenterActions';

class SuperCenterStore {
    constructor() {
        this.bindActions();
    }
}

export default alt.createStore(SuperCenterStore);