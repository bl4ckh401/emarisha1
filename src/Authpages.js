import React from "react"
import { Route, Switch } from "react-router-dom";
import Editprofile from "./Editprofile"
import Chats from "./chat";
import EHome from "./eHome";
import Profile from "./Profile";
import Header from "./header";


function Authpages() {

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/chats" component={Chats} />
        <Route path="/eHome" component={EHome} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/editprofile" component={Editprofile} />
      </Switch>
    </div>
  )

}
export default Authpages;