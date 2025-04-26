import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { _id, fullName, email: loggedInEmail } = response.data;

      localStorage.setItem('user', JSON.stringify({
        _id,
        fullName,
        email: loggedInEmail
      }));
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login failed', error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data.message : 'Login failed');
    }
  };

  return (
    
      <div className="card w-96 shadow-lg p-8 bg-base-100">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    
  );
};

export default LoginPage;
