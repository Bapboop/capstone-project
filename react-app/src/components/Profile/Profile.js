import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getUsersPost } from "../../store/posts";
import { deletePost } from "../../store/posts";
import EditPostForm from "../PostForm/EditPost/EditPostForm";



const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { userId } = useParams();
    // alert(userId)

    useEffect(() => {
        dispatch(getUsersPost(userId))
    }, [dispatch])


    const posts = useSelector((state) => {
        return Object.values(state.posts);
    });




    const handleDelete = (e) => {
      e.preventDefault();
      const postId = e.target.id
      console.log(postId, 'Hey, is this working? postId')
      dispatch(deletePost(postId))
      dispatch(getUsersPost(userId))
      history.push(`/users/${userId}`)
      // const deletedPost = dispatch(deletePost(posts.id))

    }

    return (
        <>
        <h1> TEST</h1>
        {posts?.map((post) => (
          <div key={post?.id} className="profile-feed">
            <img src={post?.photo_url} alt="" />
            <p> {post?.description}</p>
            <button id={post?.id} className="delete-button" onClick={handleDelete}>Delete</button>
            <EditPostForm post={post}/>
          </div>
        ))}
      </>
    )
}


export default Profile
