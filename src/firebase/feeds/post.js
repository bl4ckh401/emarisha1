import { Avatar } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { db } from "../../firebase";
import CommentInput from "./CommentInput";
import Comment from "./comments";
import "./post.css"

function Post({ id, userName, postFileUrl, caption, comments, user, capital, yearlyIncome, Challenges }) {
  const deletePost = () => {
    //delete post
    db.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div class="bg-gray-300 mt-4">
      <div className="post__header" class="flex flex-row justify-between px-4 py-3">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
        <Avatar
            class="h-8 w-8 bg-gray-100 justify-center item-center rounded-full text-bold"
            alt={userName.toLowerCase()}
            style={{ height: "25px", width: "25px" }}
          >
            {userName.charAt(0)}
          </Avatar>
          <div className="post__headerInfo">
            <p style={{ fontSize: "14px" }}>{userName}</p>
          </div>
        </div>
        {user ? (
          user.displayName.toLowerCase() === userName.toLowerCase() ? (
            <div>
              <label>
                <Delete style={{ marginTop: "5px" }} onClick={deletePost} />
              </label>

            </div>):(<></>)):(<></>)
            }
      </div>
      {/* headr --> avatar + username + time */}

      {/* image */}
      <img className="post__image" src={postFileUrl} alt="post" />
      {/* username + caption */}
      <div className="post__bottom">
          <Avatar
            alt={userName.toLowerCase()}
            style={{ height: "25px", width: "25px", color:"black" }}
          >
            {userName.charAt(0)}
          </Avatar>
          <div className="all__ps">
          <p className="cap__Area">
          {caption}
        </p>
        <p className="cap__Area">
        Capital:{capital}
        </p>
        <p className="cap__Area">
         Challenges: {Challenges}
        </p>
        <p className="cap__Area">
         YearlyIncome:{yearlyIncome}
        </p>

          </div>
       </div>
       {comments ? (
        comments.map((comment) => (
          <Comment username={comment.userName} comment={comment.comment} />
        ))
      ) : (
        <></>
      )}
      <CommentInput comments={comments} id={id} user={user} />
    </div>
  );
}

export default Post;