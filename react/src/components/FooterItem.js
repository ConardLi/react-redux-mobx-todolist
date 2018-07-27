import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FooterItem extends Component {

    constructor(props){
        super(props);
        this.handleFilterTodo = this.handleFilterTodo.bind(this);
    }

    handleFilterTodo(){
        this.props.filterTodo(this.props.showFilter)
    }

    render() {
        const { filter, showFilter, showText } = this.props;
        return (
            <a onClick={this.handleFilterTodo} className={filter === showFilter ? 'active' : null}>
            {showText}
            </a>
        )
    }

}


FooterItem.propTypes = {
    showFilter: PropTypes.string.isRequired,
    filter:PropTypes.string.isRequired,
    showText:PropTypes.string.isRequired,
    filterTodo:PropTypes.func.isRequired
}

export default FooterItem;
