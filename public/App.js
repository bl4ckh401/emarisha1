import './App.css';
import EHome from './eHome';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter as Router, Route, Switch, useHistory  } from "react-router-dom";
import { useState, useEffect } from 'react';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null)
  const history = useHistory()


  function authListener() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
            console.log(user.displayName )
            history.push('/')
        } else {
            setUser(null);
        }
    });
}

useEffect(() => {
   authListener()
},[])

  return (
    <div className="App">
      <Router>
      <Route exact path="/SignUp"  component={Signup} />
        <Switch>
          <Route exact path="/Login" component={Login} />
          {user ? (
             <Route exact path="/" component={EHome}/>
          ):
          (
            <Login />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
