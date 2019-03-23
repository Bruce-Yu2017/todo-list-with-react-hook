import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = (props) => {
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
            Reminder
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure to delete todo list with content of: <strong className='deletedcontentName'>{props.row.content}</strong> ?</h4>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="danger" onClick={() => props.del()}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default DeleteModal;