import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // メモリリークの可能性がある
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setTodos((prev) => [...prev.reverse()]);
    }, 5000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newTodos = [...todos, input.trim()].sort().reverse();
      localStorage.setItem('tempTodo', JSON.stringify(newTodos));
      setTodos(JSON.parse(localStorage.getItem('tempTodo') || '[]'));
      setInput('');
    }
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>TODOリスト - {currentTime.toLocaleTimeString()}</h1>
      <form onSubmit={handleSubmit}>
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
