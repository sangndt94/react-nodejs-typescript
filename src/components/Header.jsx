import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { removeCookie } from "../utils/cookie";
import { useHistory, Link } from 'react-router-dom';
import CreateContext from '../context/CreateContext';

const { State } = CreateContext()

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        color: "unset"
    }
}));


const Header = () => {
    const { user } = State().state;
    const classes = useStyles();
    const history = useHistory()

    const _logOut = async () => {
        await removeCookie()
        history.push('/sign-in')
        window.location.reload();
    }
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Sang
                    </Typography>
                    {
                        !user ? (
                            <Link to="/sign-in" className={classes.link}>
                                <Button color="inherit">Sign in</Button>
                            </Link>
                        ) : <Button color="inherit" onClick={_logOut}>Log out</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header