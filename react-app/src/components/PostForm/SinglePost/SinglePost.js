import { React, useState } from "react";
import ViewComments from "../../Comments/ViewComments";
import "./SinglePost.css";
import EditPostForm from "../EditPost/EditPostForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { alertPost, deletePost } from "../../../store/posts";
import { getUsersPost } from "../../../store/posts";
import AddComment from "../../Comments/CreateComment";
import { editPost } from "../../../store/posts";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // console.log(user.id, 'this is the user!!')
  const currUser = user?.id;
  // console.log(currUser, 'this is the curr user')
  const [currPost, setCurrPost] = useState(post)

  const [showEdit, setShowEdit] = useState(false);

  const [description, setDescription] = useState(currPost?.description);
  const updateDescription = (e) => setDescription(e.target.value);

  const { userId } = useParams();

  const handleDelete = async (e) => {
    e.preventDefault();
    const postId = e.target.id;
    // console.log(postId, 'Hey, is this working? postId')
    // // dispatch(deletePost(postId))

    const deletedPost = await dispatch(deletePost(postId));
    // console.log(deletedPost)

    if (!deletedPost) {
      dispatch(getUsersPost(userId));
      // history.push(`/users/${userId}`)
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
    setCurrPost(updatedPost)

    if (updatedPost) {
      dispatch(getUsersPost(post?.user_id));
    }

  };

  return (
    <>
      <div className="single-post">
        <div className="single-post-container">
          <img className="single-post-image" src={currPost?.photo_url} />
        </div>

        <div className="single-post-info">
          <div className="owner-info">
            Owner Pic Username
            {!showEdit && (
              <>
                <p>{currPost?.description}</p>
                {currUser === currPost?.user_id && (
                  <>
                    <button onClick={handleEditClick}>Edit</button>
                    <button
                      id={currPost?.id}
                      className="delete-button"
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
                <p>{currPost?.description}</p>
                {/* <EditPostForm post={post} setShowEdit={setShowEdit} /> */}
                <textarea
                  placeholder={currPost?.description}
                  type="text"
                  value={description}
                  onChange={updateDescription}
                />
                <button onClick={handleEditSubmit}>Save changes</button>
                <button onClick={handleCancelClick}>cancel</button>
              </>
            )}
            <div></div>
          </div>
          <div className="post-description"></div>

          <div className="post-comments">
            <ViewComments post={currPost} />
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
