import React, { useEffect, useState} from 'react';      
import { Container, Button, Avatar, CssBaseline, Card, CardContent, makeStyles, Typography, TextField} from "@material-ui/core";
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
                console.log(user.displayName )
                history.push('/editprofile')
            } else {
                setUser(null);
            }
        });
    }

  useEffect(() => {
       authListener()
  },[])
    

    const classes=useStyles();
    return (
        <div>
            <Container maxWidth="xl">
                <Card className={classes.Card}>
                    <CardContent>
                        <CssBaseline/>
                            <div className={classes.Paper}>
                                <Avatar className={classes.Avatar}>
                                    <LockRounded/>
                                </Avatar>
                                <Typography>
                                    Sign In
                                   <p>{error.message}</p> 
                                </Typography>
                                <form className={classes.Form} onSubmit={Login}>
                                <TextField type='email' value={email} placeholder="Enter Email" onChange={handleChange} required autoComplete='on' />
                                <TextField type='password' value={password} placeholder="Password" onChange={handleChangePassword} required autoComplete='on' />
                                <Button type='submit'  variant="contained" style={{marginTop:10}}color='secondary' onClick={Login}>SIGN IN</Button>
                                </form>

                                <a style={{marginTop:"10px"}}href="https://www.google.com">Forgot Password?</a>
                                <Link to="/SignUp">Dont Have an Account?    SIGN UP</Link>  
                            </div>
                    </CardContent>
                </Card>                    
            </Container>            
        </div>
    )
}

const useStyles = makeStyles((theme) =>({
   Paper:{
            marginTop: theme.spacing(8),
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

}))

export default Login
