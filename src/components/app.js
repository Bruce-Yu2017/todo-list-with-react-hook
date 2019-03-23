import React, { useState, useEffect } from 'react';
import CreateTodo from './create-todo';
import TodoTable from './todo-table';
import axios from 'axios';


const App = () => {
  const [tableState, setTable] = useState([]);
  const [alert, setAlert] = useState({alertMsg: '', show: false, type: ''});

  const fetchTableData = () => {
    axios.get('http://localhost:3001/todos').then(({ data }) => {
      setTable(data);
    })
  }

  const submitForm = (formData) => {
    axios.post('http://localhost:3001/todos', formData).then((res) => {
      setAlert({alertMsg: res.data.content, show: true, type: 'create'});
      setTable([res.data, ...tableState]);
      setTimeout(() => {
        setAlert({alertMsg: '', show: false, type: ''});
      }, 2500);
    })
  }

  const editRow = (obj, index) => {
    axios.patch(`http://localhost:3001/todos/${obj.id}`, obj).then((res) => {
      setTable(tableState.map((item, idx) => {
        return idx === index ? res.data : item;
      }))
      let line = document.querySelectorAll('.selectedRow')[index];
      line.style.background = 'bisque';
      setAlert({alertMsg: res.data.content, show: true, type: 'edit'});
      setTimeout(() => {
        line.style.background = '';
        setAlert({alertMsg: '', show: false, type: ''});
      }, 2500);
    })
   
  }

  const deleteRow = (obj) => {
    axios.delete(`http://localhost:3001/todos/${obj.id}`).then((res) => {
      let index = obj.index;
      setAlert({alertMsg: tableState[index].content, show: true, type: 'delete'});
      setTable(tableState.filter((item, idx) => {
        return idx !== index;
      }))
      setTimeout(() => {
        setAlert({alertMsg: '', show: false, type: ''});
      }, 2500);
    })
  }

  useEffect(() => {
    fetchTableData();
  }, [])
  return (

    <div className='container'>
      {alert.show && alert.type === 'create' &&
        <div className="alert alert-warning" role="alert">
        Your todo list: <strong>{alert.alertMsg}</strong> has been created successfully!
      </div>}
      {alert.show && alert.type === 'delete' &&
        <div className="alert alert-warning" role="alert">
        Your todo list: <strong>{alert.alertMsg}</strong> has been deleted successfully!
      </div>}
      {alert.show && alert.type === 'edit' &&
        <div className="alert alert-warning" role="alert">
        Your todo list: <strong>{alert.alertMsg}</strong> has been editted successfully!
      </div>}
      <h1 className='title'>Todo Lists</h1>
      <CreateTodo
        submitFunction={submitForm}
      />
      <TodoTable
        tableData={tableState}
        deleterow={deleteRow}
        editrow={editRow}
      />
    </div>

  )
}

export default App;
