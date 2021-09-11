import React, { useState, useEffect } from 'react';
import { API_URL } from './config';
import './App.css';

import SearchBox from './components/SearchBox';

var results = [];

function setAlbumResults(obj) {
  const entries = [];
  // console.log(obj);
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const el = obj[key];
      entries.push({
        title: el.title.label,
        category: el.category.attributes.label,
        releaseDate: el['im:releaseDate'].attributes.label,
        datestamp: el['im:releaseDate'].label,
        image: el['im:image'][0].attributes.label,
        imageHeight: el['im:image'][0].attributes.height,
        amount: el['im:price'].attributes.amount,
        currency: el['im:price'].attributes.currency,
      });
    }
  }
  return entries;
}

async function loadData() {
  const response = await fetch(API_URL);
  const json = await response.json();
  let entry = {};

  for (const key in json) {
    if (Object.hasOwnProperty.call(json, key)) {
      const outer = json[key];
      console.log(outer.entry);
      entry = outer.entry;
      results = setAlbumResults(entry);
      break;
    }
  }
}

function App() {
  // onLoad
  useEffect(() => {
    loadData()
  }, []);

  return (
    <div className='container m-1'>
      <div>
        <h1>Top 100 Albums</h1>
      </div>
      {/* <SearchBox /> */}
        {results.length > 0 && (
          <div className='results'>
            {results.map((item) => {
              return (
                <div key={item.title}>
                  <div>{item.title}</div>
                  <div>{item.category}</div>
                  <div>{item.releaseDate}</div>
                  <img src={item.image} alt={item.title} />
                  <div>{item.amount} {item.amount}</div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}

export default App;
