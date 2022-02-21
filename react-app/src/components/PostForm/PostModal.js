import {React, useState } from 'react';
import { Modal } from '../../context/Modal';
import PostForm from './PostForm';

function PostFormModal() {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false)
  }

  return (
    <>

      <p  className="post-modal-click" onClick={() => setShowModal(true)}>
      <i  class="fa-regular fa-square-plus" />
      </p>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm  hideModal={hideModal} />
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;
