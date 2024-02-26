import { useState } from "react";
import TodoTable from "./TodoTable";
function App() {
  const [todo, setTodo] = useState({
    description: '',
    date: ''
  });
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo.description && todo.date) {
      setTodos([...todos, todo]);
      setTodo({ description: '', date: '' }); // Reset the todo input after adding
    } else {
      alert("Please type a description and select a date first.");
    }
  };

  const deleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <>
      <div>
        <input
          placeholder="Description"
          onChange={e => setTodo({ ...todo, description: e.target.value })}
          value={todo.description}
        />
        <input
          type="date"
          onChange={e => setTodo({ ...todo, date: e.target.value })}
          value={todo.date}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <TodoTable todos={todos} deleteTodo={deleteTodo} />
    </>
  );
}

export default App;
