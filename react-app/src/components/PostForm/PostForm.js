import { React, useState } from "react";
import { createNewPost, getAllPosts, getUsersPost } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./PostForm.css";
import EditPostForm from "./EditPost/EditPostForm";

const PostForm = ({ hideModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const [errors, setErrors] = useState([]);
  console.log(errors)

  const [testPreview, setTestPreview] = useState("")

  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");

  const updatePhotoUrl = (e) => setPhotoUrl(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image upload starts here
    const formData = new FormData();
    formData.append("image", image);
    // console.log(formData, " THIS IS THE FORM DATA!!!");
    // console.log(image, "does the image have a value?");

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch("/api/posts/image", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const datatest = await res.json();
      console.log(datatest.url, "is the url working?");
      setPhotoUrl(datatest?.url)
      // console.log(datatest, ' is this working?')
      // setImage(datatest.url);
      setImageLoading(false);

      const payload = {
        user_id: sessionUser.id,
        photo_url: datatest.url,
        description: description,
      };

      const data = await dispatch(createNewPost(payload));

      // console.log('postform data', data.errors)
      if (data && data.errors) {
        // console.log(data.errors, '?????@@@')
        console.log(data.errors)
        setErrors(data.errors);
      } else {
        dispatch(getUsersPost(sessionUser.id));
        hideModal();
        history.push(`/users/${sessionUser.id}`);
      }
      // history.push("/images");
    } else {

      setErrors(['Make sure your file is a pdf, png, jpg, jpeg or gif.'])
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }

  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) {

      setTestPreview(URL.createObjectURL(file))
      setImage(file);
      console.log(file, 'file?????')
      console.log(image, 'image?????')
    }
  };

  return (
    <form className="postForm" onSubmit={handleSubmit}>
      <div className="errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
          <img className="preview-post-pic" src={testPreview}></img>
      <input
        className="file-upload"
        type="file"
        accept="image/*"
        onChange={updateImage}
        // type="text"
        // placeholder="Picture URL"
        // required
        // value={photoUrl}
        // onChange={updatePhotoUrl}
      />
      <textarea
        placeholder="Description (optional)"
        // required
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
