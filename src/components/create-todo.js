import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from 'uuid';


const CreateTodo = ( { submitFunction, editInfo, editfunction, onhide } ) => {
  const [date, setDate] = useState(null);
  const [content, setContent] = useState('');

  const dateChange = (selectedDate) => {
    setDate(selectedDate);
  }
  const contentChange = (content) => {
    setContent(content)
  }

  useEffect(() => {
    if (editInfo) {
      setContent(editInfo.content);
      setDate(new Date(editInfo.date))
    }
  }, [])

  const submit = (e) => {
    e.preventDefault();
    // console.log(date.toLocaleDateString(), content)
    let obj = { date: date.toLocaleDateString(), content: content, id: uuid.v1() }
    if (editInfo) {
      if (editInfo.id) {
        obj.id = editInfo.id;
        editfunction(obj);
      }
    }
    else {
      submitFunction(obj);
    }
    setDate(null);
    setContent('');
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <div className="form-group">
          <label>Content</label>
          <input type="text" value={content} onChange={(e) => contentChange(e.target.value)} className="form-control" placeholder="Enter content" />
        </div>
        <div className="form-group">
          <label style={{"display": "block"}}>Date</label>
          <DatePicker
            className="form-control"
            selected={date}
            minDate={new Date()}
            onChange={(selectedDate) => dateChange(selectedDate)}
            placeholderText="Select a date"
          />
        </div>
        
      </form>
      <button onClick={(e) => submit(e)} className="btn btn-primary">{editInfo ? "Edit" : "Submit"}</button>
        {editInfo && <button className="btn btn-danger ml-2" onClick={() => onhide()}>Close</button>}
    </div>
  )
}

export default CreateTodo;