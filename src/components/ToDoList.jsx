import ToDoItem from './ToDoItem';

const ToDoList = ({ tasks, toggleComplete, deleteTask, editTask }) => {
  return (
    <div className="w-full p-4">
      {tasks.map((task, index) => (
        <ToDoItem
          key={index}
          task={task}
          index={index}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default ToDoList;
