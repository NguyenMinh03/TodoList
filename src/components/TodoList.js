import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
const tableColumns = [
  { field: "description", sortable: true, filter: true },
  { field: "date", sortable: true, filter: true },
  {
    field: "priority",
    sortable: true,
    filter: true,
    cellStyle: (params) =>
      params.value === "High" ? { color: "red" } : { color: "black" },
  },
];

function Todolist(props) {
  const [todo, setTodo] = useState({ description: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();
  const handleClick = () => {
    setTodos([todo, ...todos]);
    setTodo({ description: "", date: "", priority: "" });
  };

  const handleDelete = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  };
  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select row first");
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <input
          placeholder="Description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <input
          type="date"
          value={todo.date}
          placeholder="Date"
          onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        />
        <input
          type="priority"
          placeholder="Priority"
          value={todo.priority}
          onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
        />
        <button onClick={handleClick}>ADD TODO</button>
        <button onClick={deleteTodo}>Delete</button>
      </div>

      <div
        className="ag-theme-material"
        style={{ height: "900px", maxWidth: "700px", margin: "auto" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          columnDefs={tableColumns}
          rowData={todos}
          rowSelection="single"
        ></AgGridReact>
      </div>

      {/* <AgGridReact columnDefs={tableColumns} rowData={todos} /> */}
      {/* <table>
        <tbody>
          {props.todos.map((todo, index) => (
            <tr key={index}>
              <td> {todo.description}</td>
              <td> {todo.date}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
}

export default Todolist;
