'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { db } from '../lib/firebase'; // Adjust the path as necessary
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
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

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchTerm}`);

    try {
      const artistsRef = collection(db, 'artists');
      const q = query(artistsRef, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
      const querySnapshot = await getDocs(q);

      const artistInfo = querySnapshot.docs.map(doc => ({
        name: doc.data().name,
        imageURL: doc.data().imageURL,
        bio: doc.data().bio || 'No information available.',
      }));

      setResults(artistInfo);
    } catch (error) {
      console.error('Error fetching artist data:', error);
      setResults([{ name: 'Error', imageURL: '', bio: 'No information available.' }]);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container1">
      <h1>Artist Search</h1>
      <form onSubmit={handleSearch} className="artist-search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an artist"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        <div className="artist-gallery">
          {results.map((artist, index) => (
            <div key={index} className="artist-card">
              <img src={artist.imageURL} alt={artist.name} />
              <h2>{artist.name}</h2>
              <p>{artist.bio}</p>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}
