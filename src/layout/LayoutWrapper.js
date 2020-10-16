import React, { Component } from 'react'
import { Layout } from 'antd'
import Footer from '../common/footer/Footer'
import Header from '../common/header/Header'
import BtnUp from '../common/btnUp/BtnUp'
// import {Link, withRouter} from 'react-router-dom'

// import * as paths from '../routes/paths'

const { Content } = Layout

export default class LayoutBase extends Component {
    render() {
        return (
            <Layout className='layout'>
                <Header/>
                <Content>
                    {this.props.children}
                </Content>
                <Footer />
                <BtnUp />
            </Layout>
        )
    }
}