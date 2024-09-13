'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getArtistInfo } from './lib/artist'; // Adjust the path if necessary

export default function Home() {
  const [user, setUser] = useState(null);
  const [artists, setArtists] = useState({});

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (storedUser && storedUser.username === username) {
        setUser(storedUser);

        // Reload the page only if it hasn't been reloaded before
        if (!sessionStorage.getItem('reloaded')) {
          sessionStorage.setItem('reloaded', 'true');
          window.location.reload();
        }
      }
    }

    // Fetch artist data from Firestore
    const fetchArtists = async () => {
      const artistData = await getArtistInfo();
      setArtists(artistData);
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <h1>Welcome to HitTastic!</h1>
      {user ? <p>Logged in as {user.username}</p> : <p>Please login or signup</p>}
      <div className="artist-gallery">
        {Object.keys(artists).map((key, index) => (
          <div key={index} className="artist-card">
            <img src={artists[key].imageURL} alt={artists[key].name} />
            <p>{artists[key].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
