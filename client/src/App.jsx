import { useEffect, useReducer, useState } from 'react';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const session = sessionStorage.getItem('isLogged');

    if (session) {
      setIsLogged(true);
    }
  }, [isLogged]);

  return (
    <>
      <h1>Passwortmanaget</h1>
      <BrowserRouter>
        <div className="main">
          {isLogged
            ? <Dashboard />
            : <Login setIsLogged={setIsLogged} />}
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
