import { useState } from "react";
import { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; 
function App() {
  const [todo, setTodo] = useState({
    description: '',
    priority:'',
    date: ''
  });
  const [todos, setTodos] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "description", sortable: true, filter: true },
    { field: "priority", sortable: true, filter: true, 
      cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} },
    { field: "date", sortable: true, filter: true }
  ]);

  const gridRef = useRef();
  const handleClick = () => {
    if (todo.description && todo.date && todo.priority) {
      setTodos([...todos, todo]);
      setTodo({ description: '', date: '',priority:'' }); // Reset the todo input after adding
    } else {
      alert("Please type a description and select a date first.");
    }
  };
  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => 
        index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
      alert('Select a row first!');
    }
  }
  return (
    <>
        <input
          placeholder="Description"
          onChange={e => setTodo({ ...todo, description: e.target.value })}
          value={todo.description}
        />
          <input 
          placeholder="Priority" 
          onChange={e => setTodo({...todo, priority: e.target.value })} 
          value={todo.priority} /> 
        <input
          type="date"
          onChange={e => setTodo({ ...todo, date: e.target.value })}
          value={todo.date}
        />
        <button onClick={handleClick}>Add Todo</button>
        <button onClick={handleDelete}>Delete</button>
        <div className="ag-theme-material" style={{width: 600, height: 650}}>
        <AgGridReact 
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api }
          rowData={todos}
          columnDefs={colDefs}
          rowSelection="single"
        />
      </div> 
    </>
  );
}

export default App;
