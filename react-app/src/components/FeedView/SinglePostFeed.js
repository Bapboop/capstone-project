import React from "react"
import AddComment from "../Comments/CreateComment"
import ASinglePostModal from "../PostForm/SinglePost/SinglePostModal"
import './SinglePostFeed.css'





const PostFeed = ({post}) => {


    return (
        <>

        <div className='feed-post-container'>
            <div className='feed-post-owner'>
                Post Username Here
            </div>

            <div className='feed-photo'>
        <ASinglePostModal post={post}>
                <img src={post?.photo_url} alt={post?.description} />
        </ASinglePostModal>
            </div>
            {/* <div className='feed-likes'>
                Likes
            </div> */}
            <div className='feed-description'>
                <p>Post Owner Description: {post?.description}</p>
            </div>

            {/* <div className='feed-comments'>
                View all # comments
            </div> */}
            {/* <div className='feed-new-comment'>
                Add a comment...
                <AddComment post={post} />
            </div> */}
        </div>

        </>
    )

}


export default PostFeed
