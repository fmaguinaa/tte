import React, {Component, Fragment} from "react";
import {withRouter} from "next/router";
import {
    Box,
    Container,
    Paper,
    Typography,
    withStyles
} from '@material-ui/core';

import Header from "./Header";
import Footer from "./Footer";

const styles = theme => ({

});

export default class Layout extends Component {
    state = {
        //visibleDrawer: false,
    }

    handleShowDrawer = () => {
        //this.setState({visibleDrawer: !this.state.visibleDrawer})
    }

    render () {
        const {children} = this.props;
        return (
            <Fragment>
                <Header/>
                <Container maxWidth="sm">
                    <Box my={4}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Next.js example
                        </Typography>
                    </Box>
                    {children}
                </Container>
                <Footer/>
            </Fragment>
        );
    }
}