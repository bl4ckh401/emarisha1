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
      <div>
        {Allmessages && (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "auto",
              minHeight: "88vh",
              flexDirection: "column",
              gap: "5px",
              background: "turquoise",
              margin: "3em auto",
              padding: "10px"
            }}
          >
            {Allmessages.map((msg) => (
              <div
                style={{
                  maxWidth: "70%",
                  boxShadow: "0px 0px 4px 1px rgba(100, 100, 100, 0.3)"
                }}
                className={
                  msg.user === auth.currentUser.displayName
                    ? "chat-container to"
                    : "chat-container from"
                }
              >
                <ChatMessage key={msg.id} message={msg} me={auth.currentUser} />
              </div>
            ))}
            <form
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                justifyContent: "center"
              }}
            >
              <textarea
                type="text"
                placeholder="Enter Message"
                rows={4}
                style={{
                  flexGrow: "1",
                  border: "none",
                  padding: "7px 5px",
                  borderRadius: "4px",
                  minHeight: "45px"
                }}
                onChange={handleInput}
              />
              <button
                type="submit"
                onClick={handleSendMessage}
                style={{
                  backgroundColor: "white",
                  height: "45px",
                  minWidth: "80px",
                  padding: "3px 5px",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                  border: "none",
                  borderRadius: "4px"
                }}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
export default Chats;
