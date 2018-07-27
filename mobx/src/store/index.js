import { observable } from 'mobx'

const store = observable({
  filter: 'all',
  todos: [{ id: 0, text: '吃饭', completed: false }, { id: 1, text: '睡觉', completed: true }],
  edit: { isEdit: false, editText: '', editId: ' ', },
  addInputValue:"",
  get visibleTodos() {
    switch (this.filter) {
      case 'all':
        return this.todos;
      case 'complete':
        return this.todos.filter(t => t.completed);
      case 'active':
        return this.todos.filter(t => !t.completed);
      default:
        throw new Error('错误的filter:' + this.state.filter)
    }
  }
});

export default store