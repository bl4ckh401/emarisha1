import { Container, Button, Avatar, CssBaseline, Card, CardContent, makeStyles, Typography, TextField, Link } from "@material-ui/core";
import { Person } from '@material-ui/icons';
import React, {useState} from 'react'
import { auth } from "./firebase/index";


function Signup() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

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
        <div>
            <Container maxWidth="xl">
                <Card className={classes.Card}>
                    <CardContent>
                        <CssBaseline/>
                        {error}
                            <div className={classes.Paper}>
                                <Avatar className={classes.Avatar} >
                                    <Person/>
                                </Avatar>
                                <Typography>
                                    Sign Up
                                </Typography>
                                <form onSubmit={handleSignUp}>
                                <TextField style={{marginTop:10}} type='email' value={email} placeholder="Enter Email" onChange={handleChange} required/><br/>
                                <TextField style={{marginTop:10}} type='password' value={password} placeholder="Password" onChange={handleChangePassword} required autoComplete='on'/><br/>
                                <TextField style={{marginTop:10}} type='password' value={confirmPassword} placeholder="Confirm Password" onChange={handleChangeConfirmPassword}required autoComplete='on'/><br/>
                                <Link to="./Login ">
                                <Button style={{marginTop:10}} type='submit'  variant="contained" color='secondary' onClick={handleSignUp}>SIGN UP</Button>
                                </Link>
                                </form>
                                <h3 style={{display:'inline-block'}}>Already have an Account?</h3>
                                <Link href='./Login'>
                                <Button color='primary' variant="contained">SIGN IN</Button>
                                </Link>
                            </div>
                    </CardContent>
                </Card>                    
            </Container>            
        </div>
    )
}
const useStyles = makeStyles((theme) =>({
    Paper:{
        marginTop: "8%",
        display:'flex',
        flexDirection:'column',
        alignItems:"center"
},
Form:{
    width:"100%",
    marginTop:theme.spacing(1),
    display:'flex',
    flexDirection:'column',
    alignItems:"center"
},
Avatar:{
    margin:theme.spacing(1),
    backgroundColor:theme.palette.secondary.main
},
Card:{
    marginTop:"60px",
    paddingLeft:"20px",
    paddingRight:"20px",
    paddingBottom:"20px"
},
Submit:{
    background:"linear-gradient(45edg,#FE6B8B 30%, FF8E53 90%)",
    margin:theme.spacing(3,0,2),
    color:"blue",
    variant:"contained"
}
})
)
export default Signup;