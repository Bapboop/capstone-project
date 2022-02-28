import React from "react"
import AddComment from "../Comments/CreateComment"
import ASinglePostModal from "../PostForm/SinglePost/SinglePostModal"
import './SinglePostFeed.css'
import { NavLink } from "react-router-dom"





const PostFeed = ({post}) => {


    return (
        <>

        <div className='feed-post-container'>
            <div className='feed-post-owner'>
                <NavLink  style={{ textDecoration: 'none', color: 'black' }} to={`/users/${post?.user_id}`}>
                <span className="username">
                    {post?.username}

                    </span>
                    </NavLink>
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
                <p> <span className="username"> {post?.username}:</span> {post?.description}</p>
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
