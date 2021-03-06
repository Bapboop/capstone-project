import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewComment, getAllComments } from "../../store/comments";

const AddComment = ({ post }) => {
  const dispatch = useDispatch();
  const postId = post?.id;

  const [comment, setComment] = useState("");

  const updateComment = (e) => setComment(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: sessionUser.id,
      comment: comment,
      post_id: postId,
    };

    await dispatch(createNewComment(payload));

    dispatch(getAllComments(post?.id));
    setComment("");
  };

  return (
    <>
      {/* <div> */}

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          required
          value={comment}
          onChange={updateComment}
        />
        <button
        disabled={!comment ? true : false}
        className='comment-post-butt'> Post </button>
      </form>
      {/* </div> */}
    </>
  );
};

export default AddComment;
