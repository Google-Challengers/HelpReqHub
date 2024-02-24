
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    data: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(feedback)
      const res = await axios.post(
        `/api/feedback`,
        {name:feedback.name,email:feedback.email,feedback:feedback.data}
      );

      if (res.data.success) {
        setFeedback((prev) => ({name:'',email:'',data:''}));
        updateState((prev) => !prev);
      } else {
        alert("Error creating new request");
      }
    } catch (e) {
      console.error(e);
    }
    // Reset form fields
    setFeedback({
      name: '',
      email: '',
      data: ''
    });
  };

  return (
    <div className="w-60 h-auto m-3 md:w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input type="text" id="name" name="name" value={feedback.name} onChange={handleChange} placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" id="email" name="email" value={feedback.email} onChange={handleChange} placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <div className="mb-4">
          <label htmlFor="data" className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea id="data" name="data" value={feedback.data} onChange={handleChange} placeholder="Your Message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
