import { React, useState  } from "react";
import { Avatar } from "@material-ui/core";
import "./Editprofile.css"
import { storage, db } from "./firebase";
import firebase from "firebase";


function Editprofile(user, userProfileUrl) {
   
   const [name, setName] = useState("")
   const [userName, setUserName] = useState("")
   const [Bios, setBios] = useState("")
     const [file, setFile] = useState(null);



const handledp = (event) => {
      if (event.target.files[0]) {
      setFile(event.target.files[0]);
            var displayPhoto = URL.createObjectURL(event.target.files[0]);

}
}

const handleNewUser = (user) => {
     const newUser = storage.ref(`user/${userName}`).put(userName) 
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
            .child(userName)
            .getDownloadURL()
            .then((url) => {
              db.collection("user").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userName: userName,
                userProfileUrl:url,
                Bios: Bios,
                name:name
              });
            setName("")
            setUserName("")
            setBios("")
            setFile(null)
            });
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
          <label htmlFor="displayPhoto" >
            <Avatar className="profile__picture"
            style={{
                height:"120px",
                width:"120px"
            }}
            >
            </Avatar>
            <input 
            id="displayPhoto"
            type="file"
            accept="image/*"
            />
            </label>

            
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