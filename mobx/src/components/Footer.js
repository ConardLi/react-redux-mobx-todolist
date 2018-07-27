import React, { Component } from 'react';
import FooterItem from './FooterItem';
import store from '../store/index';
import { observer } from 'mobx-react';

@observer
class Footer extends Component {
    render() {
        return (
            <p className="footer">
                Show:
            <FooterItem
                    showFilter="all"
                    showText={`全部(${store.todos.length})`}
                />
                <FooterItem
                    showFilter="active"
                    showText={`未完成(${store.todos.filter(t => !t.completed).length})`}
                />
                <FooterItem
                    showFilter="complete"
                    showText={`已完成(${store.todos.filter(t => t.completed).length})`}
                />
            </p>
        )
    }
}



export default Footer;
