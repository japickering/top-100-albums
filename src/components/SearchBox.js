import React, { useState, useEffect } from 'react';

export default function SearchBox() {
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <form className='search-form' action='' noValidate>
      <i className='fa fa-search'></i>
      <input
        type='text'
        className='search p-2'
        placeholder='Search albums..'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type='submit'
        className=''
        onClick={(e) => {
          e.preventDefault();
        }}>
        Search
      </button>
    </form>
  );
}
