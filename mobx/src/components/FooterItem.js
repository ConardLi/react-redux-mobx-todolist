import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../store/index';
import { observer } from '../../node_modules/mobx-react';

@observer
class FooterItem extends Component {


    handleFilterTodo() {
        store.filter = this.props.showFilter
    }

    render() {
        return (
            <a onClick={() => { this.handleFilterTodo() }} className={store.filter === this.props.showFilter ? 'active' : null}>
                {this.props.showText}
            </a>
        );
    }
}


FooterItem.propTypes = {
    showFilter: PropTypes.string.isRequired,
    showText: PropTypes.string.isRequired
}

export default FooterItem;
