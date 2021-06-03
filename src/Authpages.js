import React from "react"
import eHome from "./eHome";
import Allprofile from "./Allprofiles";
import { Route, Switch } from "react-router-dom";
import Editprofile from "./Editprofile"

function Authpages() {


    return(
        <div>
          <Switch>
            <Route path="/Editprofile" component={Editprofile} />
          </Switch>
        </div>
    )
    
}
export default Authpages;