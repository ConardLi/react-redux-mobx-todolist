import React, { Component } from 'react';
import store from '../store/index';
import { observer } from '../../node_modules/mobx-react';

@observer
class AddTodo extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let val = store.addInputValue.trim();
        if (val) {
            let obj = { id: new Date().getTime(), text: val, completed: false };
            store.todos.push(obj);
            store.addInputValue = "";
        }
    }

    handleChange(e) {
        store.addInputValue = e.target.value;
    }

    render() {
        return (
            <div className="inner">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="添加Todo" ref="newItem" value={store.addInputValue} onChange={this.handleChange} />
                    <button type="submit">添加</button>
                </form>
            </div>
        )
    }
}


export default AddTodo;
