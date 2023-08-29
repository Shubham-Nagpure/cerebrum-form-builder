import { useState } from 'react';
import './App.css';
import './assets/theme.scss';
import CanvasEditor from './features/CanvasEditor';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CanvasEditor />
    </>
  );
}

export default App;
