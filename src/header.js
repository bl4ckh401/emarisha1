import React from "react";
import { auth } from "./firebase/index";
import { Menu, MenuItem } from "@material-ui/core";
import "./header.css";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";
import "./styles/main.css"


function Header({ user, email, password, userProfileUrl }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    auth.signOut()
    history.push('/Login')
  }


  return (
    <div class="flex w-screen p-4 mt-4 bg-pink-600 justify-end item-center">
      <img class="w-5 h-5 rounded-full"
        src={userProfileUrl}
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
          class="flex flex-row"
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
          <Link to="/chats"><MenuItem onClick={handleClose}>Chats
          </MenuItem></Link>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
