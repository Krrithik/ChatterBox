import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/api/auth/signup', { fullName, email, password });
      const { _id, fullName: signedUpFullName, email: signedUpEmail } = response.data;

      console.log(fullName, email);
      toast.success('Signup successful!');
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.message : 'Signup failed');
    }
  };

  return (
    <div className='signup-container min-h-screen flex items-center justify-center bg-base-200'>
      <div className="card w-96 shadow-lg p-8 bg-base-100 ">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input input-bordered"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered"
          />
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </form>
      </div>

      </div>
    
  );
};

export default SignUpPage;
