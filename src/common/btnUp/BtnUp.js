import React, { Component } from 'react';
import { Button } from 'antd'

import { moveTo } from '../../utils'

export default class BtnUp extends Component {

    state = {
        visible: false
    }

    up = (e) => {
        moveTo(e, 0)
    }

    scroll = () => {
        let visible = window.scrollY > window.innerHeight
        this.setState({visible: visible})
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scroll);
    }


    render() {
        return (
            <div className='btnUp-container'>
                <Button
                    className={`btn-up ${this.state.visible ? 'btn-up-visible' : ''}`}
                    onClick={this.up}
                    icon='up'
                />
            </div>
        )
    }
}