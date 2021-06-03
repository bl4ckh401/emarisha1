import React from "react";
import { auth } from "./firebase/index";
import { Menu, MenuItem } from "@material-ui/core";
import "./header.css";
import Avatar from "@material-ui/core/Avatar";
import Login from "./Login";
import {Link, useHistory} from "react-router-dom"


function Header({ user, email, password }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = (event) => {
        auth.signOut()
        history.push('/Login')
      }


  return (
    <div className="header">
      <img
        className="header__LeftLogo"
        src="https://firebasestorage.googleapis.com/v0/b/whatsapp-link-generator-5376e.appspot.com/o/images%2Freact%20social%20theindianappguy.png?alt=media&token=453609cf-32e5-45f3-b1c6-cd9cbbd5a90c"
        alt=""
      />
        <div className="header__Right">
          {/* <button className="button" onClick={() => auth.signOut()}>
            
          </button> */}

          <Avatar
            className="header__RightProfileImg"
            onClick={handleClick}
            style={{ height: "25px", width: "25px" }}
          >
          </Avatar>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/Profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem> 
          </Menu>
        </div>
    </div>
  );
}

export default Header;
