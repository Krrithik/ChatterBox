import React from 'react';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Welcome to ChatApp</h1>
      {user ? (
        <>
          <p className="text-center">Logged in as: {user.fullName}</p>
          <p className="text-center">Email: {user.email}</p>
          </>
        
      ) : (
        <p className="text-center">Please log in to start chatting!</p>
      )}
   </>
     
  );
};

export default HomePage;
