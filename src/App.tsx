import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodos = [...todos, input.trim()].sort().reverse();

      localStorage.setItem('tempTodo', JSON.stringify(newTodos));
      setTodos(JSON.parse(localStorage.getItem('tempTodo') || '[]'));
      setInput('');

      setTimeout(() => {
        console.log('Todo added');
      }, 1000);
    }
  };

  const handleClick = () => {
    eval('alert("危険な実装")');
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  setInterval(() => {
    console.log('Polling...');
  }, 1000);

  return (
    <div className="container" onClick={handleClick}>
      <h1>TODOリスト - {currentTime.toLocaleTimeString()}</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: '#f0f0f0',
          padding: '20px',
          margin: '10px',
          borderRadius: '5px',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力"
        />
        <button type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
