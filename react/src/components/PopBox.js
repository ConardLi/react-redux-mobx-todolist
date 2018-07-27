import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    componentWillReceiveProps(newProps) {
        if (newProps.oldText && this.props.oldText !== newProps.oldText) {
            this.setState({
                editText: newProps.oldText
            });
        }
    }

    handleSaveEdit() {
        this.props.saveEdit(this.state.editText);
    }

    handleChange(e) {
        if (e.target.value) {
            this.setState({
                editText: e.target.value,
                isEmpty: false
            });
        } else {
            this.setState({
                editText: e.target.value,
                isEmpty: true
            });
        }
    }

    render() {
        return (
            <div className={this.props.isEdit ? "pop-box p-active" : "pop-box"} >
                <div className="pop-header">请输入要修改的值</div>
                <div className="pop-body">
                    <input value={this.state.editText} onChange={this.handleChange} />
                </div>
                <div className="pop-footer">
                    <button
                        onClick={this.handleSaveEdit}
                        disabled={this.state.isEmpty ? true : false}
                        className={this.state.isEmpty ? "btnInfo b_disabled" : "btnInfo"}>
                        确认
                    </button>
                    <button onClick={this.props.hidePop}>取消</button>
                </div>
            </div>
        )
    }

}


PopBox.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    oldText: PropTypes.string,
    hidePop: PropTypes.func.isRequired,
    saveEdit: PropTypes.func.isRequired
}


export default PopBox;
