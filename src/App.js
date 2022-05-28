import './App.css';
import EHome from './eHome';
import Profile from "./Profile"
import Allprofile from "./Allprofiles"
import Login from './Login';
import Signup from './Signup';
import Authpages from "./Authpages"
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { auth } from './firebase';


function App() {

  const [user, setUser] = useState(null)
  const history = useHistory()


  function authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log(user.displayName)
      } else {
        setUser(null);
      }
    });
  }

  useEffect(() => {
    authListener()
  }, [])


  return (
    <div className="w-screen bg-gray-300 items-center content-center">
      <Router>
        <Switch>
          <Route exact path="/SignUp" component={Signup} />
          <Route exact path="/Login" component={Login} />
          {user ? (
            <Authpages />
          ) :
            (
              <Login />
            )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
