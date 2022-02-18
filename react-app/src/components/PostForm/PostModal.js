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
      <button onClick={() => setShowModal(true)}>POST</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostForm  hideModal={hideModal} />
        </Modal>
      )}
    </>
  );
}

export default PostFormModal;
