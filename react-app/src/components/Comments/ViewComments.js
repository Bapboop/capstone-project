import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, deleteAComment } from "../../store/comments";
import EditComment from "./EditComment";
import "../PostForm/SinglePost/SinglePost.css";

const ViewComments = ({ post }) => {
  const dispatch = useDispatch();
  const postId = post?.id;
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    await dispatch(getAllComments(postId));
    // 500 ms to see loading
    // await new Promise((r) => setTimeout(r, 200));
    setLoading(false);
  }, [post]);

  const comments = useSelector((state) => {
    return Object.values(state.comments);
  });

  // Temp delete placeholder:
  const handleDelete = async (e) => {
    e.preventDefault();
    const commentId = e.target.id;

    const deletedComment = await dispatch(deleteAComment(commentId));
  };

  return (
    <>
      {loading ? (
        <img src="https://res.cloudinary.com/dd9qejhag/image/upload/v1645754503/Gardengram/Spinner-1s-200px_spauch.gif" />
      ) : (
        <>
          {comments?.map((comment) => (
            <>
              <p>
                {" "}
                <span className="username">{comment?.username}:</span>{" "}
                {comment?.comment}
              </p>
              <div>
                <EditComment comment={comment} post={post} />
                {comment?.user_id === userId && (
                  <button
                    id={comment?.id}
                    className="delete-comment"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};

export default ViewComments;
