import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getUsersPost } from "../../store/posts";
import { deletePost } from "../../store/posts";
import EditPostForm from "../PostForm/EditPost/EditPostForm";
import ProfileTop from "./ProfileTop";
import './Profile.css'
import { SinglePostModal } from "../../context/Modal";
import ASinglePostModal from "../PostForm/SinglePost/SinglePostModal";



const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { userId } = useParams();
    // alert(userId)



    const posts = useSelector((state) => {
      return Object.values(state.posts);
    });

    console.log(posts, '$#@$#@$@#$#@$#@@')

    useEffect(() => {
        dispatch(getUsersPost(userId))
    }, [dispatch])



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

    return (
        <>
        {/* <h1> TEST</h1> */}

        <div>
        <ProfileTop />
        </div>


        <div className='profile-posts'>

        {posts?.map((post) => (
          <div key={post?.id} className="profile-feed">
            <img src={post?.photo_url} alt="" />
            <p> {post?.description}</p>
            <button id={post?.id} className="delete-button" onClick={handleDelete}>Delete</button>
            <EditPostForm post={post}/>
            <ASinglePostModal post={post}/>
          </div>
        ))}
        </div>
      </>
    )
}


export default Profile
