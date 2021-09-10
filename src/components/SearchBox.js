import React, { useState, useEffect } from 'react';

export default function SearchBox() {
  const { search, setSearch } = useState('');

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <form className='search-form' action=''>
      <i className='fa fa-search'></i>
      <input
        id='search'
        type='text'
        placeholder='Search albums..'
        value=''
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type='submit' 
        onClick={(e) => {
          e.preventDefault();
        }}>
        Search
      </button>
    </form>
  );
}
