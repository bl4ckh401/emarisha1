import { Container, Button, Avatar, CssBaseline, Card, CardContent, makeStyles, Typography, TextField, Link } from "@material-ui/core";
import { Person } from '@material-ui/icons';
import React, { useState } from 'react'
import { auth } from "./firebase/index";


function Signup() {
    const [lastName, setLastName] = useState("")
    const [firstName, setFistName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleChangeFirstName = (event) => {
        const data = event.target
        setFistName(
            data.value
        )
    }
    const handleChangeLastName = (event) => {
        const data = event.target
        setLastName(
            data.value
        )
    }
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

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(
            event.target.value
        )
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: `${email.match(/^([^@]*)@/)[1]}`,
                });
            })
            .catch((error) => {
                setError(error.message)
                console.log(error)
            })

    }
    const classes = useStyles();
    return (
        <div class="flex flex-col justify-center items-center" className="sign_up">
            <div maxWidth="xl" className={classes.Container}>
                <div className={classes.Card}>
                    <div className={classes.CardContent}>
                        <CssBaseline />
                        {error.message}
                        <div className={classes.Paper}>
                            <Avatar className={classes.Avatar} >
                                <Person />
                            </Avatar>
                            <Typography>
                                Sign Up
                            </Typography>
                            <form onSubmit={handleSignUp} class="flex flex-col flex-wrap justify-center items-center">
                                <div class="flex flex-col">
                                    <div class="flex flex-col">
                                        <input style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} type='text' value={firstName} placeholder="Firstname" onChange={handleChangeFirstName} required /><br />
                                        <input style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} type='text' value={lastName} placeholder="Lastname" onChange={handleChangeLastName} required /><br />
                                        <input style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} type='email' value={email} placeholder="Email" onChange={handleChange} required /><br />
                                    </div>
                                    <div class="flex flex-col">
                                        <input style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} type='password' value={password} placeholder="Password" onChange={handleChangePassword} required autoComplete='on' /><br />
                                        <input style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} type='password' value={confirmPassword} placeholder="Confirm Password" onChange={handleChangeConfirmPassword} required autoComplete='on' /><br />
                                        <Link to="./Login ">
                                            <Button style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} type='submit' variant="contained" color='secondary' onClick={handleSignUp}>SIGN UP</Button>
                                        </Link>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-start py-4">
                                    <h3 style={{ display: 'inline-block' }}>Already have an Account?</h3>
                                    <Link href='./Login'>
                                        <Button style={{ marginTop: 10, width: 360, borderRadius: 10, height: 40, paddingTop: 10, paddingBottom: 10, paddingLeft: 5 }} color='primary' variant="contained">SIGN IN</Button>
                                    </Link>
                                </div>
                            </form>
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
})
)
export default Signup;