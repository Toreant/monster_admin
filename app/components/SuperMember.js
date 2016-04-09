/**
 * Created by apache on 16-4-8.
 */
import React from 'react';
import SuperMemberActions from '../actions/SuperMemberActions';
import SuperMemberStore from '../stores/SuperMemberStore';
import Loading from './Loading';
import config from '../config';

class SuperMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = SuperMemberStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        SuperMemberStore.listen(this.onChange);
        SuperMemberActions.getMember(this.props.params.domain);
    }

    componentDidUpdate(preProps) {
        console.log(preProps.params.domain,this.props.params.domain);
        if(preProps.params.domain != this.props.params.domain) {
            SuperMemberActions.getMember(this.props.params.domain);
        }
    }

    componentWillUnmount() {
        SuperMemberStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {

        let Content = null;

        if(this.loading) {
            Content = <Loading key="dsadsadsadsad"/>;
        } else {
            Content = (
                <div className="container animated fadeIn">
                    <div className="raw">
                        <img src={this.state.avatar || '/img/default.png'} alt="loading" width="100" height="100"/>
                        <a href={config.url + 'member/' + this.state.domain}>
                            {this.state.username}
                        </a>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {Content}
            </div>
        );
    }
}

export default SuperMember;