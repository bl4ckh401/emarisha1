import React,{useState} from 'react'
import "./stories.css"
import firebase from "./firebase/index"
import { db, storage } from "./firebase/index";
import DisplayStories from './DisplayStories';
// import CircularProgress from "@material-ui/core/CircularProgress";


function Stories() {

const [file, setFile] = useState("")
const [uploaded, setUpload] = useState(false)
const [progress, setProgress] = useState(false)


const handleFileChange = (event) => {
    const data = event.target
    if(data.files[0])
    setFile(
        data.files[0]
    )
    var src1 = URL.createObjectURL(data.files[0])
    var preview1 = document.getElementById("file-1-preview");
    preview1.src = src1;
    preview1.style.display = "block"
    
    setUpload(true)
}

const handleUpload = () => {
    if(file){
        const storyRef = storage.ref(`files/${file.name}`).put(file);

        storyRef.on("state_changed",
        (snapshot) => {
            // progress function .....
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
        (error) =>{
            console.log(error)
        },
        storage.ref("files")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
            db.collection("Story").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                postURL:url
            })
        })
        )
        setProgress(false);
        var preview1 = document.getElementById("file-1-preview");
        preview1.style.display = "none";
    }
}
const removeImage = () => {
    var preview1 = document.getElementById("file-1-preview");
    preview1.style.display = "none";
  };

    return (
        <div className="all-stories">
            <div>
                <input type='file' onChange={handleFileChange} className='new-story'/>
            </div>
            <button onClick={handleUpload}>Upload</button>
            
            <div >
                <img onClick={() => removeImage()}  id="file-1-preview" alt={file.name} className='story-image' />
                {progress === false ? (
            <>
            
            </>
          ) : (
                <p>Uploading</p>
          )}
        </div> 
            {uploaded ? <></> : <DisplayStories />}

        </div>
        
    )
}

export default Stories
