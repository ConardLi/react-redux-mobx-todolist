import React, { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../store/index';

 class TodoItem extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handelEditClick = this.handelEditClick.bind(this);
        this.handelDelClick = this.handelDelClick.bind(this);
    }

    handleClick (){
        store.todos.forEach(element => {
            if (element.id === this.props.id) {
                element.completed = !element.completed;
            }
        });
    }

    handelEditClick(){
        store.edit = {
            editId: this.props.id,
            editText: this.props.text,
            isEdit: true
        }
    }

    handelDelClick(){
        let tempIndex;
        store.todos.forEach((element, index) => {
            if (element.id === this.props.id) {
                tempIndex = index;
            }
        });
        store.todos.splice(tempIndex, 1);
    }

    render() {
        const {completed, text} = this.props;
        return (
            <li>
                <em onClick={this.handleClick} className={completed ? 'selected' : null}></em>
                <p onClick={this.handleClick} className={completed ? 'completed' : null} >{ text}</p>
                <i onClick={this.handelEditClick} className={completed ? 'hide' : "fa fa-pencil"} aria-hidden="true"></i>
                <span onClick={this.handelDelClick} >×</span>
            </li>
        )
    }

}

TodoItem.propTypes = {
    id: PropTypes.number.isRequired,
    text:PropTypes.any.isRequired,
    completed:PropTypes.bool.isRequired
}


export default TodoItem;
