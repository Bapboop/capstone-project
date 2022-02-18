import { React, useState } from "react";
import { createNewPost, getAllPosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PostForm.css";
import EditPostForm from "./EditPost/EditPostForm";

const PostForm = ({ hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");
  // const [errors, setErrors] = useState([]);

  const updatePhotoUrl = (e) => setPhotoUrl(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: sessionUser.id,
      photo_url: photoUrl,
      description: description,
    };

    // let errors = [];

    const new_post = await dispatch(createNewPost(payload));

    if (new_post) {
      dispatch(getAllPosts());
      hideModal();
      // return new_post
    }
  };

  return (
  
      <form className="postForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Picture URL"
          required
          value={photoUrl}
          onChange={updatePhotoUrl}
        />
        <textarea
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription}
        />

        <button type="submit">Submit</button>
      </form>


  );
};

export default PostForm;
