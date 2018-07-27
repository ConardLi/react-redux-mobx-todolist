import React, { Component } from 'react';
import TodoItem from './TodoItem';
import store from '../store/index';
import { observer } from '../../node_modules/mobx-react';

@observer
class TodoItemList extends Component {

    render() {
        return (
            <ul className="dodo-list">
                {store.visibleTodos.map(todo => {
                    return (
                        <TodoItem
                            key={todo.id}
                            text={todo.text}
                            completed={todo.completed}
                            id={todo.id}
                        />)
                }
                )}
            </ul>
        )
    }
}


export default TodoItemList;
