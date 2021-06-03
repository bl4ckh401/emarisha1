import React from "react"
import Profile from "./Profile"
import Editprofile from "./Editprofile"
import Header from "./header"
import { Route, Switch, useHistory  } from "react-router-dom";


function Allprofile() {
    return(
        <div>
        <Header />
        <Switch>
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/Editprofile" component={Editprofile} />
        </Switch>
        </div>

    )
    
}
export default Allprofile;