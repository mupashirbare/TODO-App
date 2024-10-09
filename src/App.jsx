import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import Home from './components/Home';
import Contact from './components/Contact';
import ToDoList from './components/ToDoList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  // State for tasks, new task input, and editing status
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add or update a task
  const addTask = () => {
    if (newTask.trim() === '') return; // Prevent adding empty tasks

    if (isEditing) {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false); // Reset editing state
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]); // Add new task
    }
    setNewTask(''); // Clear input field
  };

  // Function to toggle task completion
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Function to edit a task
  const editTask = (index) => {
    setIsEditing(true);
    setNewTask(tasks[index].text); // Populate the input with the task's text
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
