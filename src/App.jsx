import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
      
      {/* Input and Add/Update Button */}
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

      {/* Task List */}
      <div className="w-full sm:w-3/4 lg:w-1/2 mx-auto">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet.</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className={`p-4 flex justify-between items-center border-b ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              <span>{task.text}</span>
              <div className="flex space-x-2">
                <button onClick={() => toggleComplete(index)} className="text-green-600">
                  <FaCheck />
                </button>
                <button onClick={() => editTask(index)} className="text-blue-600">
                  <FaEdit />
                </button>
                <button onClick={() => deleteTask(index)} className="text-red-600">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
