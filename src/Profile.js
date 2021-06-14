import React, {useEffect, useState} from "react"

import { Avatar } from "@material-ui/core"
import { db, auth } from "./firebase/index";
import "./Profile.css";
import {useHistory, Link, Route} from "react-router-dom";
import Editprofile from "./Editprofile"


function Profile(userName,Bios,name,userProfileUrl, posts, uid){

      const [post, setPost] = useState([])
      const history = useHistory()

    db.collection(`posts`)
   .get()
   .then((querySnapShot) => {
      const posts = querySnapShot.docs.map(doc => doc.data())
      return posts
   })
   .catch((error) => {
      console.log("Error Retriving Post", error.message)
   })
   const fetchPost = async () => {
      try {
                  const post = posts.map((post) => {
          return post.postFileUrl
   })
      } catch (error) {
         console.log(error)
      }
   }
  
   useEffect(() => {
      fetchPost()
   }, []);
    return(
       <div className="Allprofile">
       <div className="profile__page">
     <div className="Avatar">
        <Avatar
         className="profile__picture"
         style={{height:"90px", width:"90px"}}
        >
        {userProfileUrl}
        </Avatar>
       </div>
       <div  className="Friends">
          <div className="posts">
             <h5>Posts</h5>
             <p>{post.length}</p>
          </div>
          <div className="Mentors">
             <h5>Mentors</h5>
             <p>0</p>
          </div>
          <div className="Mentees">
             <h5>Mentees</h5>
             <p>0</p>
          </div>
       </div>
       <div className="Bios">
         {Bios}
       </div>
       </div>
       <Link to="/Editprofile"><button type="submit" className="Edit__Profile" >Edit Profile</button></Link>
       <hr/>
       </div>
)
}
export default Profile;
