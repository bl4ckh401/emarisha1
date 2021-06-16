import React from "react"
import eHome from "./eHome";
import Allprofile from "./Allprofiles";
import { Route, Switch } from "react-router-dom";
import Editprofile from "./Editprofile"
import Profile from "./Profile"
import Angel from "./Angel"
import Chats from "./chat";


function Authpages() {


    return(
        <div>
          <Switch>
            <Route path="/eHome" component={eHome} />
          </Switch>
        </div>
    )
    
}
export default Authpages;