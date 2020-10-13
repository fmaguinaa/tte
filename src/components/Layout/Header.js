import React from 'react'
import {
    Paper,
    withStyles
} from '@material-ui/core';
import { Zoom, Bounce, Fade } from 'react-reveal';

const styles = theme =>({
    avatar:{
        [theme.breakpoints.down('md')]: {
            width: 60,
            height: 32
        },
        width:80,
        height:48
    },
    root:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

    },
    actionRoot:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    green:{
        background: `radial-gradient(circle at center, red 0, blue, green 100%)`
    },
    title:{
        [theme.breakpoints.down('md')]: {
            fontSize:14,
        }
    }
});
const Header = ({title, classes}) => (
    <Paper className="p-1" color="primary">
        <figure className={classes.root}>
            <Bounce>
                {/* <img
                    className={classes.avatar}
                    src={CencosudScotiaBank}
                    alt="Cencosud ScotiaBank"
                    /> */}
                <h1>asd</h1>
            </Bounce>
            <figcaption className="w-100">
                <Fade>
                    {/* <Title
                        align="center"
                        title={title}
                    /> */}
                    <p>asdasd</p>
                </Fade>
            </figcaption>
        </figure>
    </Paper>
)

export default withStyles(styles)(Header);
