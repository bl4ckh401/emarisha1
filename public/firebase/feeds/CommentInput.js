import React, {useState} from 'react'
import { db } from '..';
import "./CommentInput.css"

function CommentInput({comments, id, user}) {
    const[comment, setComment] = useState("")
    const[commentMap] = useState(comments ? comment : [])

    const addComment = () => {


        commentMap.push({
            comment: comment,
            userName: user.displayName.toLowerCase(),
          });

          db.collection('posts')
          .doc(id)
          .update({
              comments:commentMap, 
          })
          .then(function () {
              console.log("Posted Successfully")
          })
          .catch((error) => {
            console.log("Error Posting",error);
          })

          setComment("")
    }

    return (
        <div className="commentInput">
            <textarea 
            row="1"
            value={comment}
            onChange={(e) => {setComment(e.target.value)}}
            className="commentInput__textarea"
            placeholder="Add a Comment...."
            >
            </textarea>

            <button
            onClick={addComment}
            className="button commentInput__button"
            >
            Post
            </button>
        </div>
    )
}

export default CommentInput
