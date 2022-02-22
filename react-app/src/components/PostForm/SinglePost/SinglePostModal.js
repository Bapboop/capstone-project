import {React, useState} from "react";
import { SinglePostModal } from "../../../context/Modal";
import SinglePost from "./SinglePost";


function ASinglePostModal({post}) {
    const [showModal, setShowModal] = useState(false);

    const hideModal = () => {
        setShowModal(false)
    }


    return (
        <>
         <p  className="single-post-modal-click" onClick={() => setShowModal(true)}>
      {/* <i  class="fa-regular fa-square-plus" /> */}
      <img src={post?.photo_url} />
      </p>
             {showModal && (
                 <SinglePostModal onClose={() => setShowModal(false)}>
                    <SinglePost post={post} hidModal={hideModal}>
                    </SinglePost>
                 </SinglePostModal>
             )}
        </>
    )
}


export default ASinglePostModal
