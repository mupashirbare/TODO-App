import { useState, useEffect } from 'react';

const Home = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load tasks from localStorage and filter completed ones
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = savedTasks.filter((task) => task.completed);
    setCompletedTasks(filteredTasks);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-4xl p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome to My To-Do App!</h1>
        <h2 className="text-xl font-semibold text-center mb-4">Completed Tasks</h2>
        {completedTasks.length > 0 ? (
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Task</th>
                <th className="border px-4 py-2">Completed At</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{task.text}</td>
                  <td className="border px-4 py-2">{task.completedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No tasks completed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
