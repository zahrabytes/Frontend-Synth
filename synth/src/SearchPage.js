import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?searchTerm=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Enter search term" 
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((song, index) => (
          <li key={index}>{song.title} - {song.artist}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;