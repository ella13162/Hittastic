'use client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function ProtectedPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.username === username) {
        setUser(storedUser);
      }
    }
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      {user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
    </div>
  );
}
