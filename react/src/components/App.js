import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoItemList from './TodoItemList';
import Footer from './Footer';
import PopBox from './PopBox';
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [{ id: 0, text: '吃饭', completed: false }, { id: 1, text: '睡觉', completed: true }],
            filter: 'all',
            edit: { isEdit: false, oldText: '', editId: ' ' }
        }
        this.getVisibleTodos = this.getVisibleTodos.bind(this);
        this.onTodoClick = this.onTodoClick.bind(this);
        this.editTodoClick = this.editTodoClick.bind(this);
        this.dleTodoClick = this.dleTodoClick.bind(this);
        this.addTodoClick = this.addTodoClick.bind(this);
        this.filterTodo = this.filterTodo.bind(this);
        this.hidePop = this.hidePop.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
    }

    /**
     * 根据filter过滤要展示都数据
     */
    getVisibleTodos() {
        switch (this.state.filter) {
            case 'all':
                return this.state.todos;
            case 'complete':
                return this.state.todos.filter(t => t.completed);
            case 'active':
                return this.state.todos.filter(t => !t.completed);
            default:
                throw new Error('错误的filter:' + this.state.filter)
        }
    }

    /**
     * 点击条目
     * @param {*} id 
     */
    onTodoClick(id) {
        let array = this.state.todos.slice(0);
        array.forEach(element => {
            if (element.id === id) {
                element.completed = !element.completed;
            }
        });
        this.setState({
            todos: array
        });
    }

    /**
     * 编辑条目
     * @param {*} id 
     * @param {*} text 
     */
    editTodoClick(id, text) {
        this.setState({
            edit: {
                editId: id,
                oldText: text,
                isEdit: true
            }
        });
    }

    /**
     * 删除条目
     * @param {*} id 
     */
    dleTodoClick(id) {
        let array = this.state.todos.slice(0);
        let tempIndex;
        array.forEach((element, index) => {
            if (element.id === id) {
                tempIndex = index;
            }
        });
        array.splice(tempIndex, 1);
        this.setState({
            todos: array
        });
    }

    /**
     * 添加条目
     * @param {*} val 
     */
    addTodoClick(val) {
        let array = this.state.todos.slice(0);
        let obj = { id: new Date().getTime(), text: val, completed: false };
        array.push(obj);
        this.setState({
            todos: array
        });
    }

    /**
     * 改变过滤条件
     * @param {*} filter 
     */
    filterTodo(filter) {
        this.setState({
            filter: filter
        });
    }

    /**
     * 隐藏弹出框
     */
    hidePop() {
        this.setState({
            edit: {
                isEdit: false
            }
        })
    }

    /**
     * 保存编辑内容
     * @param {*} text 
     */
    saveEdit(text) {
        let array = this.state.todos.slice(0);
        if (text) {
            array.forEach(element => {
                if (element.id === this.state.edit.editId) {
                    element.text = text;
                }
            });
            this.setState({
                todos: array,
                edit: {
                    isEdit: false
                }
            });
        }
    }

    render() {
        return (
            <div className="container">

                <AddTodo addTodo={this.addTodoClick} />
                <TodoItemList
                    todos={this.getVisibleTodos()}
                    onTodoClick={this.onTodoClick}
                    editTodoClick={this.editTodoClick}
                    dleTodoClick={this.dleTodoClick}
                />
                <Footer
                    filter={this.state.filter}
                    filterTodo={this.filterTodo}
                    todos={this.state.todos}
                />
                <PopBox
                    isEdit={this.state.edit.isEdit}
                    oldText={this.state.edit.oldText}
                    hidePop={this.hidePop}
                    saveEdit={this.saveEdit}
                />

            </div>
        )
    }

}