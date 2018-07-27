import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {

    constructor(props) {
        super(props);
        this.state = { inputValue: '' }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let val = this.state.inputValue.trim();
        if (val) {
            this.props.addTodo(val);
            this.setState({
                inputValue: ''
            })
        }
    }

    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        return (
            <div className="inner">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="添加Todo" ref="newItem" value={this.state.inputValue} onChange={this.handleChange} />
                    <button type="submit">添加</button>
                </form>
            </div>
        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}


export default AddTodo;
