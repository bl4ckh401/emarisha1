import React, { useEffect, useState } from 'react'
import { db } from '..';
import Post from './post'
import "./Feeds.css"

function Feeds() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
        })
    }, [])

    return (
        <div className="feeds">
            <div className="feed__post">
                {posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        id={id}
                        userProfileUrl={post.userProfileUrl}
                        userName={post.userName}
                        postFileUrl={post.postFileUrl}
                        comments={post.comments}
                        capital={post.capital}
                        YearlyIncome={post.YearlyIncome}
                    />
                ))}
            </div>
        </div>
    )
}

export default Feeds
