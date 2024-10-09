const Contact = () => {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Contact Us</h1>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input type="text" className="border p-2 w-full" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input type="email" className="border p-2 w-full" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Message</label>
            <textarea className="border p-2 w-full"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      </div>
    );
  };
  
  export default Contact;
  