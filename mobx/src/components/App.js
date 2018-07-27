import React  from 'react';
import AddTodo from './AddTodo';
import TodoItemList from './TodoItemList';
import Footer from './Footer';
import PopBox from './PopBox';


const App = (props)=>{
    return (
        <div className="container">
            <AddTodo />
            <TodoItemList />
            <Footer />
            <PopBox />
        </div>
    )
}

export default App;