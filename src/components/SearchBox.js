import React, { useState, useEffect } from 'react';

export default function SearchBox() {
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    console.log(search);
  }, []);

  return (
    <form className='search-form mt-2' action=''>
      <i className='fa fa-search'></i>
      <input
        type='text' 
        className='search p-2'
        placeholder='Search albums..'
        value=''
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type='submit' 
        className='p-2'
        onClick={(e) => {
          e.preventDefault();
        }}>
        Search
      </button>
    </form>
  );
}
