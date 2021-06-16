import React, { useState } from "react";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import "./createPost.css"
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { CircularProgress } from "@material-ui/core";
import Login from "../../Login";
import Likes from "./likes"
function CreatePost({ user }) {
  const [caption, setCaption] = useState("");
  const [capital, setCapital] = useState(null);
  const [YearlyIncome, setYearlyIncome] = useState(null);
  const [Challenges, setChallenges] = useState("");
  const [insert, setInsert ] = useState(false)
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);


  const handleChange = (event) => {
    const data = event.target

    if (data.files[0]) {
      setFile(data.files[0]);
      setInsert(true)
      var src1 = URL.createObjectURL(data.files[0]);
      var preview1 = document.getElementById("image-1-preview");
      // var preview2 = document.getElementById("video-1-preview");
      preview1.src = src1;
      preview1.style.display = "block";
      // preview2.src = src1;
      // preview2.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (file) {
      const uploadTask = storage.ref(`posts/${file.name}`).put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function .....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function...
          console.log(error);
          alert(error.message);
        },
        () => {
          // upload complete function
          storage
            .ref("posts")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                capital:capital,
                yearlyIncome:YearlyIncome,
                postFileUrl: url,
                userName: user.displayName.toLowerCase(),
                userProfileUrl:
                  "https://avatars0.githubusercontent.com/u/55942632?s=460&u=f702a3d87d1f9c125f1ead9b3bec93d26cd3b3a0&v=4",
                challenges:Challenges
              });
            });

          setProgress(0);
          setCaption("");
          setCapital(null)
          setChallenges("")
          setYearlyIncome(null)
          setFile(null);
          var preview1 = document.getElementById("image-1-preview");
          // var preview2 = document.getElementById("video-1-preview");

          preview1.style.display = "none";
          // preview2.style.display = "none";

        }
      );
    }
  };

  const removeImage = () => {
    var preview1 = document.getElementById("image-1-preview");
    preview1.style.display = "none";
  };    
  const removeVideo = () => {
    var preview2 = document.getElementById("video-1-preview");
    preview2.style.display = "none";
  };    
  return (
    <div class="bg-gray-300 border-b-4 border-double border-pink-400">
        <div class="bg-gray-300">
          <div class="text-center">
            <h4>Create a Post</h4>
          </div>
            <div className="create__post">
            <textarea
              class="bg-gray-200 border-black border flex w-full py-2 px-4 mb-4"
              name="create a post"
              rows="2"
              value={caption}
              placeholder="Business Description"
              onChange={(event) => setCaption(event.target.value)}
            ></textarea> 
            <div class="flex flex-row w-screen justify-between">
            <input type='number'              
             placeholder="Capital"
              class="bg-gray-200 flex w-1/2 border-black border py-2 px-4 mb-4"
             value={capital}            
             onChange={(event) => setCapital(event.target.value)}></input>
            <input type='number'              
             placeholder="YearlyIncome"
             class="bg-gray-200 flex w-1/2 border-black border py-2 px-4 mb-4"
             value={YearlyIncome}
             onChange={(event) => setYearlyIncome(event.target.value)}>
             </input>
             <br />
              </div>

        <textarea     style= {{border : "1px solid black" }}
              class="bg-gray-200 flex w-full border-black border py-2 px-4 mb-4"
              name="create a post"
              rows="2"
              value={Challenges}
              placeholder="Pros And Cons of Business"
              onChange={(event) => setChallenges(event.target.value)}
            ></textarea> 
            <div className="Preview">
            <img onClick={() => removeImage()} id="image-1-preview" alt="" className="post_image" />
            <video onClick={() => removeVideo()} id="video-1-preview" alt="" autoPlayclassName="post_image" />
              {progress === 0 ? (
               <></> ) : (
                <CircularProgress
                className="circularProgress"
                variant="determinate"
                value={progress}
              />)}
              </div>              

            </div>
          <div className="imageUpload__bottom">
            <div className="image-upload">
              <label htmlFor="file-input">
                <CameraAltIcon style={{ marginTop: "5px" }} />
              </label>

              <input
                id="file-input"
                type="file"
                accept="file/*"
                onChange={handleChange}
              />
            </div>

            </div>
            <button
            class="bg-pink-300 rounded-full px-4 py-2 mb-3"
              onClick={handleUpload}
              style={{
                color: caption ? "green" : "red",
                fontWeight: caption ? "600" : "500",
              }}
            >
              Upload
            </button>
          </div>
        </div>)
}

export default CreatePost;
