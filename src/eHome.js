import React,{useState, useEffect} from 'react'
import { auth } from './firebase';
import CreatePost from './firebase/feeds/CreatePost'
import Feeds from './firebase/feeds/Feeds'
import Header from './header';
import Stories from './Stories'

function EHome() {
  const [user, setUser] = useState(null)
    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                setUser(null);
            }
        });
    }

  useEffect(() => {
       authListener()
  },[])


    return (
        <div className="app__body">
            
            <Header />
            <CreatePost user={user}/>
            <Feeds user={user} />
        </div>
    )
}


export default EHome;
