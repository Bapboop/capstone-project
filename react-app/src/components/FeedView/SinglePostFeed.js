import React from "react"
import './SinglePostFeed.css'





const PostFeed = ({post}) => {


    return (
        <>
        <div className='feed-post-container'>
            <div className='feed-post-owner'>
                Post Username Here
            </div>

            <div className='feed-photo'>
                <img src={post?.photo_url} alt={post?.description} />
            </div>
            <div className='feed-likes'>
                Likes
            </div>
            <div className='feed-description'>
                <p>Post Owner Description: {post.description}</p>
            </div>

            <div className='feed-comments'>
                View all # comments
            </div>
            <div className='feed-new-comment'>
                Add a comment...
            </div>
        </div>

        </>
    )

}


export default PostFeed
