import React from 'react'
import Modal from 'react-bootstrap/Modal';
import CreateTodo from './create-todo';

const EditModal = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Your Todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTodo
            editInfo={props.row}
            editfunction={props.edit}
            onhide={props.onHide}
          />

        </Modal.Body>
      </Modal>
    </div>

  );
}

export default EditModal;