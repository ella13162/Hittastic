'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { auth, provider, signInWithPopup } from '../lib/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Try to find the user by email first
      const userQueryByEmail = query(
        collection(db, 'users'),
        where('email', '==', usernameOrEmail)
      );

      // Then by username
      const userQueryByUsername = query(
        collection(db, 'users'),
        where('username', '==', usernameOrEmail)
      );

      // Fetch both queries
      const querySnapshotByEmail = await getDocs(userQueryByEmail);
      const querySnapshotByUsername = await getDocs(userQueryByUsername);

      let userDoc = null;

      // Check if we found a user by email
      if (!querySnapshotByEmail.empty) {
        userDoc = querySnapshotByEmail.docs[0];
      } 
      // If not, check by username
      else if (!querySnapshotByUsername.empty) {
        userDoc = querySnapshotByUsername.docs[0];
      }

      if (userDoc) {
        const userData = userDoc.data();
        // Verify password
        if (userData.password === password) {
          // Store user in local storage
          localStorage.setItem('user', JSON.stringify(userData));

          // Set username in cookies
          Cookies.set('username', userData.username, { sameSite: 'strict' });

          // Redirect to home page
          router.push('/');
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        username: user.displayName,
        email: user.email,
        // You can store other details if needed
      };

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Set username in cookies
      Cookies.set('username', user.displayName, { sameSite: 'strict' });

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      alert('Google sign-in failed');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
      <div className="social-login">
        <button onClick={handleGoogleSignIn}>
          <FaGoogle /> Login with Google
        </button>
        <button>
          <FaApple /> Login with Apple
        </button>
      </div>
    </div>
  );
}
