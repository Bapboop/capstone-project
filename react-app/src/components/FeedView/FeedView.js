import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/posts";

const FeedView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const posts = useSelector((state) => {
    return Object.values(state.posts);
  });
  return (
    <>
      <h1> TEST</h1>
      {posts?.map((post) => (
        <div key={post.id} className="post-feed">
          <img src={post.photo_url} alt="" />
          <p> {post.description}</p>
        </div>
      ))}
    </>
  );
};


export default FeedView;
