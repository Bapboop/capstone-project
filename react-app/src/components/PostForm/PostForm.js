import React from "react";
import { createNewPost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const PostForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const updatePhotoUrl = (e) => setPhotoUrl(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: sessionUser.id,
      photo_url: photoUrl,
      description: description,
    };

    let errors = [];

    return dispatch(createNewPost(payload))
      .catch(async (response) => {
        const data = await response.json();
        if (data.errors) setErrors(data.errors);
      })
      .then((response) => response && history.push("/feed"));
  };

  return (
    <form onSubmit={handleSubmit}>
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

export default PostForm
