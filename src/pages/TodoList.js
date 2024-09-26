import { useEffect, useState } from 'react';
import './TodoList.css';
import classNames from 'classnames';

const TodoList = () => {
  // const [todosData, setData] = useState([
  //   { id: 1, title: 'Eat blondies', completed: false },
  //   { id: 2, title: 'Smell blondies', completed: false },
  //   { id: 3, title: 'Think about more gooey blondies', completed: false },
  //   { id: 4, title: 'Plan to cook blondies in bread pan next time', completed: false },
  // ]);

  // Check if localStorage has todos. If so, load them
  const [todosData, setData] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [hoverTodoId, setHoverTodoId] = useState(null);

  // Save todos to local storage on update
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todosData));
  }, [todosData]);
  
  const onTodoToggle = id => {
    const updatedData = [...todosData];
    const index = todosData.findIndex(el => el.id === id);

    updatedData[index] = {
      ...updatedData[index],
      completed: !todosData[index].completed,
      completedAt: new Date().toLocaleString(),
    };

    setData(updatedData);
  }

  const onAddTodo = () => {
    setData(prevTodos => [
      {
        id: prevTodos.length + 1,
        title: newTodo,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null,
      },
      ...prevTodos
    ]);
    setNewTodo('');
  }

  const onDeleteTodo = id => {
    const updatedData = [...todosData];
    const index = todosData.findIndex(el => el.id === id);

    updatedData.splice(index, 1);

    setData(updatedData);
  }

  const renderTodosByStatus = ({ completed }) => {
    return todosData
      .filter(todo => todo.completed === completed)
      // sort incomplete todos descending, and complete todos ascending
      .sort((a, b) =>
        completed ?
          (a.completedAt - b.completedAt) :
          (b.createdAt - a.createdAt))
      .map(todo => (
        <div
          key={todo.id}
          onMouseEnter={() => setHoverTodoId(todo.id)}
          onMouseLeave={() => setHoverTodoId(null)}
          className="todo-item"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onTodoToggle(todo.id)}
          />
          <label>{todo.title}</label>
          <button
            className={classNames('delete-todo', { hidden: hoverTodoId !== todo.id })}
            onClick={() => onDeleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      ));
  }

  return (
    <div className="TodoList">
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder='Input new todo'
          onKeyDown={e => e.key === 'Enter' ? onAddTodo() : null}
        >
        </input>
        <button onClick={onAddTodo}>Add</button>
      </div>
      <div className="todos-container">
        {renderTodosByStatus({ completed: false })}
        {renderTodosByStatus({ completed: true })}
      </div>
    </div>
  );
}

export default TodoList;
