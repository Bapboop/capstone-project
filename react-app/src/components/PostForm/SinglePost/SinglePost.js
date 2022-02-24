import { React, useState } from "react";
import ViewComments from "../../Comments/ViewComments";
import "./SinglePost.css";
import EditPostForm from "../EditPost/EditPostForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../../store/posts";
import { getUsersPost } from "../../../store/posts";
import AddComment from "../../Comments/CreateComment";

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // console.log(user.id, 'this is the user!!')
  const currUser = user?.id
  // console.log(currUser, 'this is the curr user')

  const [showEdit, setShowEdit] = useState(false);

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


    return (
    <>
      <div className="single-post">
        <div className="single-post-container">
          <img className="single-post-image" src={post?.photo_url} />
        </div>

        <div className="single-post-info">
          <div className="owner-info">
            Owner Pic Username

            {!showEdit && (
                <>
                <p>{post?.description}</p>
                { currUser === post?.user_id &&
                <>

                <button onClick={handleEditClick}>Edit</button>
                <button
                id={post?.id}
                className="delete-button"
                onClick={handleDelete}
                >
                  Delete
                </button>
                </>
                }
              </>
            )}
            {showEdit && (
              <>
               <p>{post?.description}</p>
                <EditPostForm post={post} setShowEdit={setShowEdit} />
                <button onClick={handleCancelClick}>cancel</button>
              </>
            )}
            <div></div>
          </div>
          <div className="post-description"></div>

          <div className="post-comments">

            <ViewComments post={post} />
          </div>

          <div className="feed-new-comments">

            <AddComment post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
