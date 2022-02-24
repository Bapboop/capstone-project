import { React, useState, useEffect } from "react";
import { editComment, getAllComments } from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";

const EditComment = ({ comment, post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // console.log(post, 'post inside of edit comment?')
  const postId = post?.id;
  const userId = user?.id;

  const [commentValue, setCommentValue] = useState(comment?.comment);

  const updateComment = (e) => setCommentValue(e.target.value);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      commentValue,
      id: comment.id,
    };

    const id = comment.id;
    // console.log(id)
    // console.log(payload.commentValue, 'update comment payload??')
    const updatedComment = await dispatch(
      editComment(id, payload.commentValue)
    );
    // console.log(comment.comment, 'test')
    // dispatch(editComment(id, payload.commentValue))

    dispatch(getAllComments(postId));
  };

  if (comment.user_id === userId) {
    return (
      <>
        <form className="edit-comment-form" onSubmit={handleUpdate}>
          <input
            type="text"
            //    placeholder='Edit your comment...'
            required
            value={commentValue}
            onChange={updateComment}
          />
          <button>Save changes</button>
        </form>
      </>
    );
  } else {
    return <></>;
  }
};

export default EditComment;
