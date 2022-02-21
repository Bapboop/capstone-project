import React from "react"
import './SinglePost.css'






const SinglePost = ({post}) => {

    console.log(post, 'is this working???????????')
    return (
        <>
        <div className="single-post">

        <div className="single-post-container">
            <img className="single-post-image" src={post?.photo_url} />
        </div>

        <div className="single-post-info">
            <div className="owner-info">
            Owner Pic Username
            </div>
            <div className="post-description">
        <p>
            {post?.description}
        </p>

            </div>

            <div className="post-comments">
                Comments
            </div>
            <div className="add-comments">
                Add a comment...
            </div>

        </div>
        </div>
        </>
    )
}


export default SinglePost
