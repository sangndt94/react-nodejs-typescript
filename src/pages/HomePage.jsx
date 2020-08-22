import React, { useEffect } from 'react'
import Header from '../components/Header'
import CreateContext from '../context/CreateContext';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Container } from '@material-ui/core';

const { State } = CreateContext()

const useStyles = makeStyles((theme) => (console.log(theme),{
    img: {
        width: "100%",
        height: "100%",
    },
    container: {
        marginTop: theme.spacing(3)
    }
}));

const HomePage = () => {
    //chua lam kich hoat mail , moi chi lam gui mail
    const classes = useStyles();
    const { user } = State().state;
    return (
        <>
            <Header />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* {Array(12).map(({index}) => {
                        return <img key={index} src={"https://source.unsplash.com/random"} className={classes.img} />
                    })}
                    {
                    console.log(Array(12))
                    } */}
                    <Grid item xs={4}>
                        <img src={"https://source.unsplash.com/random"} className={classes.img} />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={"https://source.unsplash.com/random"} className={classes.img} />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={"https://source.unsplash.com/random"} className={classes.img} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default HomePage