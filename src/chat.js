import {React, useState, useEffect  } from "react";
import {db, auth} from "./firebase/index"
import firebase from "firebase";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from "./Chatmessage"
import "./chat.css"

function Chats(){

   const [messages, setMessages] = useState("")

   const handleInput = (event) => {
        setMessages(event.target.value)
}
   const handleSendMessage = async (event) => {
          event.preventDefault();
          const {displayName, uid, photoURL} = auth.currentUser;

          await messageRef.add({
              user:displayName,
              message:messages,
              createdAt:firebase.firestore.FieldValue.serverTimestamp(),
              uid:uid,
              photoURL:photoURL
          })
   }
    const messageRef = db.collection(`AllMessages`)
   const query = messageRef.orderBy('createdAt', 'asc').limitToLast(25);
   const [Allmessages] = useCollectionData(query, {idField: 'id'});

    return(
        <div>
         <h1>Chats</h1>
         {Allmessages && Allmessages.map(msg => <ChatMessage key={msg.id}
message={msg} />)}
         <form className="input_field">
           <input type="text" placeholder="Enter Message" onChange={handleInput}/>
           <button type="submit" onClick={handleSendMessage}>Send</button>
         </form>
        </div>
    )
}
export default Chats;