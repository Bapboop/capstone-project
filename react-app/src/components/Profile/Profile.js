import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getUsersPost } from "../../store/posts";
import { deletePost } from "../../store/posts";
import EditPostForm from "../PostForm/EditPost/EditPostForm";
import ProfileTop from "./ProfileTop";
import "./Profile.css";
import { SinglePostModal } from "../../context/Modal";
import ASinglePostModal from "../PostForm/SinglePost/SinglePostModal";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const { userId } = useParams();

  // alert(userId)

  useEffect(async () => {
    setLoading(true)
    await dispatch(getUsersPost(userId));
    await new Promise((r) => setTimeout(r, 200));
    setLoading(false);
  }, [userId]);

  const posts = useSelector((state) => {
    return Object.values(state.posts);
  });

  // console.log(posts, '$#@$#@$@#$#@$#@@')

  const handleDelete = async (e) => {
    e.preventDefault();
    const postId = e.target.id;
    // console.log(postId, 'Hey, is this working? postId')
    // // dispatch(deletePost(postId))

    const deletedPost = await dispatch(deletePost(postId));
    // console.log(deletedPost)

    if (!deletedPost) {
      dispatch(getUsersPost(userId));
      history.push(`/users/${userId}`);
    }
  };

  return (
    <>
      {/* <h1> TEST</h1> */}
      {loading ? (
        <>
        <img className='load-gif-profile' src="https://res.cloudinary.com/dd9qejhag/image/upload/v1645754503/Gardengram/Spinner-1s-200px_spauch.gif" />
        </>
      ) : (
      <>

      <div>
        <ProfileTop userId={userId} />
      </div>

      <div className="profile-posts">
        {posts?.map((post) => (
          <div key={post?.id} className="profile-feed">
            <ASinglePostModal post={post}>
              <img src={post?.photo_url} alt="" />
              {/* <p> {post?.description}</p> */}
              {/* <button id={post?.id} className="delete-button" onClick={handleDelete}>Delete</button> */}
              {/* <EditPostForm post={post}/> */}
            </ASinglePostModal>
          </div>
        ))}
      </div>
        </>
      )}
    </>
  );
};

export default Profile;
