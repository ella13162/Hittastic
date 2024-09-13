'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
      address,
      dob,
    };

    // Store in local storage
    localStorage.setItem('user', JSON.stringify(userData));
    Cookies.set('username', username, { sameSite: 'strict' });

    try {
      // Add a new document in Firestore
      await addDoc(collection(db, 'users'), userData);
      router.push('/');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button type="button" onClick={handleSignup}>Signup</button>
      </form>
      <div className="social-login">
        <button>
          <FaGoogle /> Signup with Google
        </button>
        <button>
          <FaApple /> Signup with Apple
        </button>
      </div>
    </div>
  );
}
