import {React, useState} from "react";
import { editPost, getUsersPost } from "../../../store/posts";
import { useDispatch, useSelector } from "react-redux";




const EditPostForm = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    // console.log(user?.id, 'is this thing on?')
    const userId = user?.id

    const [description, setDescription] = useState(post?.description)

    // post
    //  {"description":"Wow.","id":1,"photo_url":"https://res.cloudinary.com/dd9qejhag/image/upload/v1645076095/Gardengram/garden4_zcme0j.png","user_id":1}
    /*---------------------
    | So I have access to: post.description, post.id, post.photo_url, post.user_id
    -------------------*/

    const updateDescription = (e) => setDescription(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            id: post.id,
            description
        }
        console.log(payload, 'this is the payload############')


        const updatedPost = await dispatch(editPost(payload))


        if (updatedPost) {
            dispatch(getUsersPost(userId))
        }

    }

    return (
        <>

        <form className='edit-form' onSubmit={handleSubmit}>
            <textarea
            placeholder={post?.description}
            type="text"
            value={description}
            onChange={updateDescription}
            />

            <button >Save changes</button>
        </form>
        </>
    )
}


export default EditPostForm;
