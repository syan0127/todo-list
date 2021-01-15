import React from "react";
import "./App.css";

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new todo item..."
        autoFocus={true}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Todo({ todo, index, completeTodo, uncompleteTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button className="complete button" onClick={() => completeTodo(index)}>
          Complete
        </button>
        <button
          className="uncomplete button"
          onClick={() => uncompleteTodo(index)}
        >
          Un-complete
        </button>
        <button className="remove button" onClick={() => removeTodo(index)}>
          x
        </button>
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { text: "Learn about React", isCompleted: false },
    { text: "Meet friend for lunch", isCompleted: false },
    { text: "Build really cool todo app", isCompleted: false },
  ]);

  const [completed, setCompleted] = React.useState(0);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    if (!newTodos[index].isCompleted) {
      setCompleted(completed + 1);
    }
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const uncompleteTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].isCompleted) {
      setCompleted(completed - 1);
    }
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    if (newTodos[index].isCompleted) {
      setCompleted(completed - 1);
    }
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            uncompleteTodo={uncompleteTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
      <div className="input-wrapper">
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="counter">
        <span className="status">Incomplete: {todos.length - completed}</span>
        <span className="status">Complete: {completed}</span>
      </div>
    </div>
  );
}

export default App;
