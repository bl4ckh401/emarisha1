import React ,{useState} from 'react'
// import {db} from "./firebase/index"




function DisplayStories(id, postURL) {
    const [post] = useState();

    // const deletePost = () => {
    //     //delete post
    //     db.collection("posts")
    //       .doc(id)
    //       .delete()
    //       .then(function () {
    //         console.log("Document successfully deleted!");
    //       })
    //       .catch(function (error) {
    //         console.error("Error removing document: ", error);
    //       });
    //   };



    return (
        <div>
        {post ?  
            <div className="display-story">
            <img className="file-name" src={postURL} alt="story"  />
            </div> 
            :
            <p>No story uploaded</p>

        }

            
        </div>
    )
}

export default DisplayStories
