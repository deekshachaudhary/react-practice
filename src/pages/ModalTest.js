import { useState } from 'react';
import './Modal.css';

const Modal = ({ show, setShow, title, children, onSubmit }) => {
  const onCancelClick = () => {
    setShow(false);
  }

  const onConfirmClick = () => {
    onSubmit();
    setShow(false);
  }

  return (
    show ? (
      <div className="modal-overlay">
        <div className="modal">
          <div className="title">{title}</div>
          <div className="body">{children}</div>
          <div className="footer">
            <button className="confirm-button" onClick={onConfirmClick}>
              Confirm
            </button>
            <button className="cancel-button" onClick={onCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
}

const ModalTest = () => {
  const [showModal, setShowModal] = useState(false);

  const setShow = val => {
    setShowModal(val);
  }

  return (
    <div className="modal-test">
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal
        show={showModal}
        setShow={val => setShow(val)}
        title="Confirm Delete"
        onSubmit={() => console.log('Deleted!')}
      >
        <div>Are you sure you want to delete this task?</div>
      </Modal>
    </div>
  );
}

export { Modal, ModalTest };