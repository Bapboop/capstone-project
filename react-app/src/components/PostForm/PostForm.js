import { React, useState } from "react";
import { createNewPost, getAllPosts, getUsersPost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PostForm.css";
import EditPostForm from "./EditPost/EditPostForm";

const PostForm = ({ hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  // console.log(errors)

  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");

  const updatePhotoUrl = (e) => setPhotoUrl(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: sessionUser.id,
      photo_url: photoUrl,
      description: description,
    };

    // let errors = [];
    // if (photoUrl.length < 5) {
    //   setErrors(['This isn\'t a valid url!'])
    // }

    const data = await dispatch(createNewPost(payload))
      // console.log('postform data', data.errors)
      if (data && data.errors){
        // console.log(data.errors, '?????@@@')
        setErrors(data.errors)
      } else {
        dispatch(getUsersPost(sessionUser.id));
        hideModal();
        history.push(`/users/${sessionUser.id}`);
      }



    // if (new_post) {
    //   dispatch(getUsersPost(sessionUser.id));
    //   hideModal();
    //   history.push(`/users/${sessionUser.id}`);
    //   // return new_post
    // }
  };

  return (
    <form className="postForm" onSubmit={handleSubmit}>
      <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
      <input
        type="text"
        placeholder="Picture URL"
        required
        value={photoUrl}
        onChange={updatePhotoUrl}
      />
      <textarea
        placeholder="Description (optional)"
        required
        value={description}
        onChange={updateDescription}
      />

      <button className="post-butt" type="submit">
        Submit
      </button>
    </form>
  );
};

export default PostForm;
