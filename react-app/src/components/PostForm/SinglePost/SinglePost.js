import React from "react"
import ViewComments from "../../Comments/ViewComments"
import './SinglePost.css'
import EditPostForm from "../EditPost/EditPostForm"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deletePost } from "../../../store/posts"
import { getUsersPost } from "../../../store/posts"






const SinglePost = ({post}) => {
    const dispatch = useDispatch();

    const { userId } = useParams();

    const handleDelete = async (e) => {
        e.preventDefault();
        const postId = e.target.id
        // console.log(postId, 'Hey, is this working? postId')
        // // dispatch(deletePost(postId))



        const deletedPost = await dispatch(deletePost(postId))
        // console.log(deletedPost)

        if (!deletedPost) {

          dispatch(getUsersPost(userId))
          // history.push(`/users/${userId}`)
        }
      }

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
        <p>
            {post?.description}
        </p>
        <div>

        <EditPostForm post={post}/>
        <button id={post?.id} className="delete-button" onClick={handleDelete}>Delete</button>
        </div>

            </div>
            <div className="post-description">

            </div>

            <div className="post-comments">
                Comments
                <ViewComments post={post} />
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
