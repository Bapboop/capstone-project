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


  const [showEdit, setShowEdit] = useState(false)

  const handleEditClick = async (e) => {
    e.preventDefault();
    setShowEdit(true)
  }

  const handleCancelClick = async (e) => {
    e.preventDefault();
    setShowEdit(false)
  }

  useEffect(() => {
    setCommentValue(comment?.comment)
  }, [comment])



  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      commentValue,
      id: comment.id,
    };

    const id = comment.id;

    const updatedComment = await dispatch(
      editComment(id, payload.commentValue)
    );

    setShowEdit(false)
    dispatch(getAllComments(postId));
  };

  if (comment.user_id === userId) {
    return (
      <>

     {!showEdit && (
        <>
        <button onClick={handleEditClick}>Edit</button>

        </>
      )}

      {showEdit && (
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

      )}
      </>
    );
  } else {
    return <></>;
  }
};

export default EditComment;
