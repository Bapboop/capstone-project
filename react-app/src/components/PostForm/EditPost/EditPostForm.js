import { React, useState } from "react";
import { editPost, getUsersPost } from "../../../store/posts";
import { useDispatch, useSelector } from "react-redux";

const EditPostForm = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // console.log(post.user_id, 'post post post post')
  const postUserId = post?.user_id;
  // console.log(user?.id, 'is this thing on?')
  const userId = user?.id;

  // console.log(setShowEdit)

  const [description, setDescription] = useState(post?.description);

  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: post.id,
      description,
    };

    const updatedPost = await dispatch(editPost(payload));

    if (updatedPost) {
      dispatch(getUsersPost(postUserId));
    }
  };

  return (
    <>
      {/* <form className="edit-form"> */}
        <textarea
          placeholder={post?.description}
          type="text"
          value={description}
          onChange={updateDescription}
        />

      {/* </form> */}

        <button onClick={handleSubmit}>Save changes</button>
    </>
  );
};

export default EditPostForm;
