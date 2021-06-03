import { React, useState } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Likes(){

const [Count, setCount] = useState(0)
const [liked, setLiked] = useState(false)
const handleLikes = () => {
    {liked ? 
    setCount(
       prevState => (
             prevState.Count - 1), 
             setLiked(false),
    )
    :
    setCount(
       prevState => (
         prevState.Count + 1),
         setLiked(true),
         alert(Count),
                  alert(liked)

    )
    }

}

    return(
        <div>
        <div>
        { liked ? 
        
            <label htmlFor="likes" >
            <FavoriteIcon style={{height:"50px", width:"50px"}}/>
            </label>
        
         :
         
              <label htmlFor="likes">
            <FavoriteBorderIcon style={{height:"50px", width:"50px"}} />
            </label>
         
        }

          <button type="submit"
           id="likes" 
           onClick={handleLikes}
           className="likes" ></button>
        </div>
        {Count}
        </div>
    )
}
export default Likes;