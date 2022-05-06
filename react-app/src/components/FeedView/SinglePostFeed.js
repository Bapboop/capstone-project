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
                <span style={{padding: '1rem'}} className="username">
                    <img className="feed-pic" src={post?.profile_pic ? post?.profile_pic : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}/>
                    {/* {console.log(post, '@@@@@@@------')} */}
                    {/* <div> */}
                    {post?.username}

                    {/* </div> */}



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
            <div style={{padding: '1rem'}} className='feed-description'>
                <span className="username"> {post?.username}:</span> {post?.description}
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
