import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsersPost } from "../../store/posts";



const Profile = () => {
    const dispatch = useDispatch();

    const { userId } = useParams();
    // alert(userId)

    useEffect(() => {
        dispatch(getUsersPost(userId))
    }, [dispatch, userId])


    const posts = useSelector((state) => {
        return Object.values(state.posts);
    });

    console.log(posts, '@@@@@@@@@@@@@@@@@@@@@')

    return (
        <>
        <h1> TEST</h1>
        {posts?.map((post) => (
          <div key={post.id} className="profile-feed">
            <img src={post.photo_url} alt="" />
            <p> {post.description}</p>
          </div>
        ))}
      </>
    )
}


export default Profile
