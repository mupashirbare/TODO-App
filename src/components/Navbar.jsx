import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">My To-Do App</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li><Link to="/tasks" className="hover:text-gray-400">Tasks</Link></li>
          <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
