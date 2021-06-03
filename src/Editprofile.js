import { React, useState  } from "react";
import { Avatar } from "@material-ui/core";
import "./Editprofile.css"
import { storage, db } from "./firebase";
import firebase from "firebase";


function Editprofile(user0) {
   
   const [name, setName] = useState("")
   const [userName, setUserName] = useState("")
   const [Bios, setBios] = useState("")


const handleNewUser = (user) => {
     const newUser = storage.ref(`user/${user.data}`).put(user) 
      newUser.on(
        "state_changed",
        (snapshot) => {
          // progress function .....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          // Error function...
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("user")
            .child(user.data)
            .getDownloadURL()
            .then((url) => {
              db.collection("user").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userName: userName,
                userProfileUrl:
                  "https://avatars0.githubusercontent.com/u/55942632?s=460&u=f702a3d87d1f9c125f1ead9b3bec93d26cd3b3a0&v=4",
                Bios: Bios,
                name:name
              });
            });
            setName("")
            setUserName("")
            setBios("")
        }
      )
}

const handleChangeName = (event) => {
  setName(
    event.target.value
    )
}
const handleChangeUserName = (event) => {
  setUserName(
    event.target.value
    )
}
const handleChangeBios = (event) => {
   setBios(
     event.target.value
     )
}
    return(
        <div>
          <div className="Avatar2">
            <Avatar className="profile__picture"
            style={{
                height:"120px",
                width:"120px"
            }}
            />
          </div>
          <div className="textboxes">
            <input className="userName" type="text" placeholder="Name" onChange={handleChangeName} ></input><br/>
            <input className="realName" type="text" placeholder="UserName" onChange={handleChangeUserName} ></input><br/>
            <textarea className="Bios2" placeholder="Bios" onChange={handleChangeBios}></textarea>
          </div>
          <button type="submit" onClick={handleNewUser}>Save</button>
       </div>
    )
}
export default Editprofile;