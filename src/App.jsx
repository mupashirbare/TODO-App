import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import ToDoList from './components/ToDoList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []); // This runs only once when the component mounts

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;

    if (isEditing) {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]);
    }

    setNewTask(''); // Clear input field after adding/updating
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index 
        ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toLocaleString() : null } 
        : task
    );
    setTasks(updatedTasks);
  };
  

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setIsEditing(true);
    setNewTask(tasks[index].text);
    setCurrentTaskIndex(index);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={
              <div className="p-4">
                <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>
                <div className="flex justify-center mb-4">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="border rounded p-2 w-64"
                    placeholder="Enter a task..."
                  />
                  <button
                    onClick={addTask}
                    className="bg-blue-500 text-white rounded p-2 ml-2"
                  >
                    {isEditing ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
                <ToDoList
                  tasks={tasks}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              </div>
            } />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
