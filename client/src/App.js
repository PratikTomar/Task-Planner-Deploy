import React, { useState } from "react";
import './App.css';
import { TaskPlanner } from "./components/TaskPlanner";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const darkModeHandler = () => {
    setIsDarkMode((prev) => !prev)
  }
  console.log(isDarkMode);
  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <ToastContainer />
      <TaskPlanner onToggleDarkMode={darkModeHandler} isDarkMode={isDarkMode} />
      
    </div>
  );
}

export default App;
