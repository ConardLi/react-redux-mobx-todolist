import React from 'react';
import FooterItem from './FooterItem';
import PropTypes from 'prop-types';

const Footer = (props) =>
    <p className="footer">
        Show:
        <FooterItem
            filter={props.filter}
            showFilter="all"
            showText={`全部(${props.todos.length})`}
            filterTodo={props.filterTodo}
        />
        <FooterItem
            filter={props.filter}
            showFilter="active"
            showText={`未完成(${props.todos.filter(t => !t.completed).length})`}
            filterTodo={props.filterTodo}
        />
        <FooterItem
            filter={props.filter}
            showFilter="complete"
            showText={`已完成(${props.todos.filter(t => t.completed).length})`}
            filterTodo={props.filterTodo}
        />
    </p>;


Footer.propTypes = {
    filter: PropTypes.string.isRequired,
    todos:PropTypes.array.isRequired,
    filterTodo:PropTypes.func.isRequired
}

export default Footer;
