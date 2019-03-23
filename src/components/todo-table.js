import React, { useState} from 'react';
import DeleteModal from './deleteModal';
import EditModal from './editModal';

const TodoTable = ({ tableData, deleterow, editrow }) => {
  const [deleteModalStatus, setDeleteModal] = useState(false);
  const [editModalStatus, setEditModal] = useState(false);
  const [row, setRow] = useState({id: "", content: "", date: '', index: null});

  const modalClose = () => {
    setDeleteModal(false);
    setEditModal(false);
    setRow({id: "", content: "", date: '', index: null});
  };

  const modalOpen = (id, content, date, index, type) => {
    if (type === 'delete') {
      setDeleteModal(true);      
    }
    else {
      setEditModal(true);
    }
    setRow({ id: id, content: content, date: date, index: index });
  };

  const submitDelete = () => {
    modalClose();
    deleterow(row);
  }

  const submitEdit = (obj) => {
    modalClose();
    editrow(obj, row.index);
  }

  const renderRow = () => {
    return tableData.map((row, index) => {
      return (
        <tr key={index} className="selectedRow">
          <td>{index}</td>
          <td>{row.content}</td>
          <td>{row.date}</td>
          <td>
            <button className='btn btn-success' onClick={() => modalOpen(row.id, row.content, row.date, index, 'delete')}>Delete</button>
            <button className='btn btn-warning ml-2' onClick={() => modalOpen(row.id, row.content, row.date, index, 'edit')}>Edit</button>
          </td>
        </tr>
      )
    })
  }
  if (tableData.length === 0) {
    return (
      <div>
        {/* <h1>Table is Empty.</h1> */}
      </div>
    )
  }
  return (
    <div style={{ "marginTop": "30px" }}>
      <table className="table todoTable">
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderRow()}
        </tbody>
      </table>
      <DeleteModal
        show={deleteModalStatus}
        onHide={modalClose}
        row={row}
        del={submitDelete}
      />
      <EditModal
        show={editModalStatus}
        onHide={modalClose}
        row={row}
        edit={submitEdit}
      />
    </div>
  )
}

export default TodoTable;