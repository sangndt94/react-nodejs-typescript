import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    header: {
        textAlign: 'center',
    }
}));


const NotFoundPage = () => {
    const classes = useStyles();
    return (
        <h1 className={classes.header}>
            Page Not Found
        </h1>
    )
}

export default NotFoundPage