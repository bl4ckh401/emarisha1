import React, { useEffect, useState } from 'react';
import { Container, Button, Avatar, CssBaseline, Card, CardContent, makeStyles, Typography, TextField } from "@material-ui/core";
import { LockRounded } from '@material-ui/icons';
import { auth } from "./firebase/index"
import { Link, Redirect, useHistory } from 'react-router-dom';


function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [user, setUser] = useState(null)
    const isLoggedIn = useState(false)
    const history = useHistory()




    const handleChange = (event) => {
        const data = event.target
        setEmail(
            data.value
        )
    }
    const handleChangePassword = (event) => {
        setPassword(
            event.target.value
        )
    }
    const Login = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                console.log(error)
                setError(error)
                alert(error)
            })

    }

    function authListener() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                console.log(user.displayName)
                history.push('/eHome')
            } else {
                setUser(null);
            }
        });
    }

    useEffect(() => {
        authListener()
    }, [])


    const classes = useStyles();
    return (
        <div>
            <div maxWidth="xl" className={classes.Container}>
                <div className={classes.Card}>
                    <div className={classes.CardContent}>
                        <CssBaseline />
                        <div className={classes.Paper}>
                            <Avatar className={classes.Avatar}>
                                <LockRounded />
                            </Avatar>
                            <Typography>
                                Sign In
                                <p>{error.message}</p>
                            </Typography>
                            <form className={classes.Form} onSubmit={Login}>
                                <input style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} type='email' value={email} placeholder="Enter Email" onChange={handleChange} required autoComplete='on' />
                                <input style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} type='password' value={password} placeholder="Password" onChange={handleChangePassword} required autoComplete='on' />
                                <Button type='submit' variant="contained" style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} color='secondary' onClick={Login}>SIGN IN</Button>
                            </form>
                            <a style={{ marginTop: "10px" }} href="https://www.google.com">Forgot Password?</a>
                            <Link style={{ margin: "10px" }} to="/SignUp">
                                <p>Dont Have an Account?</p><br />
                                <Button type='submit' variant="contained" style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} color='primary'>SIGN UP</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    Paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center"
    },
    Form: {
        width: "100%",
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center"

    },
    CardContent: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: "60vw",
        minWidth: 420
    },
    Avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    Container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"

    },

    Submit: {
        background: "linear-gradient(45edg,#FE6B8B 30%, FF8E53 90%)",
        margin: theme.spacing(3, 0, 2),
        color: "blue",
        variant: "contained"
    }

}))

export default Login
