import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import headImage from '../../layout/images/logo.jpg'

import Social from '../social/Social'

import { Button, Drawer } from 'antd'

import * as paths from '../../routes/paths'

export default class NavBar extends Component {
    state = {
        visible: false
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    Item = (path, content) => (
        <Link to={path} onClick={this.onClose}>
            <li>
                    {content}
            </li>
        </Link>
    )

    render() {
        return (
            <div className='navbar-mobile'>
                <Button type="primary" onClick={this.showDrawer} icon='menu' />
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <div className='drawer__head'>
                        <Link to={paths.landing} onClick={this.onClose}>
                            <img src={headImage} alt='logo-head' />
                        </Link>
                    </div>
                    <div className='drawer__content'>
                        <ul>
                            {this.Item(paths.landing, 'Inicio')}
                            {this.Item(paths.nosotros, 'Nosotros')}
                            {this.Item(paths.galeria, 'Galería')}
                            {this.Item(paths.contactenos, 'Contáctenos')}
                        </ul>
                    </div>
                    <div className='drawer__footer'>
                        <Social />
                    </div>
                </Drawer>
            </div>
        )
    }
}