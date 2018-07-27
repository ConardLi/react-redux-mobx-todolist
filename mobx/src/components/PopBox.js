import React, { Component } from 'react';
import store from '../store/index';
import { observer } from 'mobx-react';

@observer
class PopBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editText:'',
            isEmpty: false
        }
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSaveEdit() {
        if (store.edit.editText) {
            store.todos.forEach(element => {
                if (element.id === store.edit.editId) {
                    element.text = store.edit.editText;
                }
            });
            store.edit.isEdit = false
        }
    }

    handleChange(e) {
        store.edit.editText = e.target.value;
        if (e.target.value) {
            this.setState({
                isEmpty: false
            });
        } else {
            this.setState({
                isEmpty: true
            });
        }
    }

    render() {
        return (
            <div className={store.edit.isEdit ? "pop-box p-active" : "pop-box"} >
                <div className="pop-header">请输入要修改的值</div>
                <div className="pop-body">
                    <input value={store.edit.editText} onChange={this.handleChange} />
                </div>
                <div className="pop-footer">
                    <button
                        onClick={this.handleSaveEdit}
                        disabled={this.state.isEmpty ? true : false}
                        className={this.state.isEmpty ? "btnInfo b_disabled" : "btnInfo"}>
                        确认
                    </button>
                    <button onClick={()=>{ store.edit.isEdit = false}}>取消</button>
                </div>
            </div>
        )
    }

}

export default PopBox;
