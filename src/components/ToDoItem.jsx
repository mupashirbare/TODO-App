import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const ToDoItem = ({ task, index, toggleComplete, deleteTask, editTask }) => {
  return (
    <div className={`p-4 flex justify-between items-center border-b ${task.completed ? 'line-through text-gray-500' : ''}`}>
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
  );
};

export default ToDoItem;
