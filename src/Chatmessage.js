import React from "react"
import "./chat.css"
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

function ChatMessage(props){
    const { user, message, uid, photoURL, createdAt } = props.message;
    return(
      <div>
        <div className="ChatMessage" id="ChatMessage">
         <div >
         <img src={photoURL}/>
         </div>
          <div>
            <p>{user}</p>
            <p>{message}</p>
          </div>
        </div>
        </div>
    )
}
export default ChatMessage