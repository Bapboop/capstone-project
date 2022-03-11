import { React, useEffect, useState } from "react";
import ViewComments from "../../Comments/ViewComments";
import "./SinglePost.css";
import EditPostForm from "../EditPost/EditPostForm";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alertPost, deletePost, getAllPosts } from "../../../store/posts";
import { getUsersPost } from "../../../store/posts";
import AddComment from "../../Comments/CreateComment";
import { editPost } from "../../../store/posts";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const currUser = user?.id;

  const [currPost, setCurrPost] = useState(post);

  const [showEdit, setShowEdit] = useState(false);

  const [description, setDescription] = useState(currPost?.description);
  const updateDescription = (e) => setDescription(e.target.value);

  const { userId } = useParams();

  const handleDelete = async (e) => {
    e.preventDefault();
    const postId = e.target.id;

    const deletedPost = await dispatch(deletePost(postId));

    if (!userId) {
      dispatch(getAllPosts());
    } else {
      dispatch(getUsersPost(post?.user_id));
      // dispatch(getAllPosts())
    }
  };

  // console.log(post, 'is this working???????????')

  const handleEditClick = async (e) => {
    e.preventDefault();
    setShowEdit(true);
  };

  const handleCancelClick = async (e) => {
    e.preventDefault();
    setShowEdit(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: currPost.id,
      description,
    };

    const updatedPost = await dispatch(editPost(payload));
    setCurrPost(updatedPost);
    setShowEdit(false);

    if (!userId) {
      dispatch(getAllPosts());
    } else {
      dispatch(getUsersPost(post?.user_id));
      // dispatch(getAllPosts())
    }
  };

  return (
    <>
      <div className="single-post">
        <div className="single-post-container">
          <img className="single-post-image" src={currPost?.photo_url} />
        </div>

        <div className="single-post-info">
          <div className="post-info">
            <div className="owner-info">

              {/* Owner Pic Username */}
              <NavLink  style={{ textDecoration: 'none', color: 'black' }} to={`/users/${post?.user_id}`}>

              {/* {console.log(post, '@@@@@---------')}
              <div className="name-pic">
                 <img className="post-profile" src={post?.profile_pic ? post?.profile_pic : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}/>
              </div> */}
              <span className="username">
                  {post?.username}</span>
              </NavLink>
              {!showEdit && (
                <>
                  <p>{currPost?.description}</p>
                  {currUser === currPost?.user_id && (
                    <>
                      <button className="edit-description-button" onClick={handleEditClick}>Edit</button>
                      <button
                        id={currPost?.id}
                        className="delete-description-button"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </>
              )}
              {showEdit && (
                <>
                  <div>{currPost?.description}</div>
                  {/* <EditPostForm post={post} setShowEdit={setShowEdit} /> */}
                  <div className='description-options'>

                  <textarea
                  className="edit-text"
                  placeholder={currPost?.description}
                  type="text"
                  value={description}
                  onChange={updateDescription}
                  />
                  <button className="save-changes" onClick={handleEditSubmit}>Save changes</button>
                  {/* <button className="cancel-changes" onClick={handleCancelClick}>cancel</button> */}
                  </div>
                </>
              )}
              <div></div>
            </div>
            <div className="post-description"></div>

            <div className="post-comments">
              <ViewComments post={currPost} />
            </div>
          </div>

          <div className="feed-new-comments">
            <AddComment post={currPost} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
