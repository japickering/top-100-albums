import React, { useState, useEffect } from 'react';

export default function SearchBox() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <form className='search-form' tabindex='-1' role='search'>
      <svg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' className='search-box-icon'>
        <path d='M11.87 10.835c.018.015.035.03.051.047l3.864 3.863a.735.735 0 1 1-1.04 1.04l-3.863-3.864a.744.744 0 0 1-.047-.051 6.667 6.667 0 1 1 1.035-1.035zM6.667 12a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667z'></path>
      </svg>
      <input
        type='search'
        className='search corners' 
        placeholder='Search..'
        aria-autocomplete='none'
        aria-multiline='false'
        autocomplete='off'
        autocorrect='off'
        autocapitalize='off'
        spellcheck='false'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type='submit' 
        className='btn-success p-2'
        onClick={(e) => {
          e.preventDefault();
        }}>
        Search
      </button>
    </form>
  );
}
