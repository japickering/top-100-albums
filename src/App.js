import React, { useState, useEffect } from 'react';
import { API_URL } from './config';

// styles
import './App.css';

// components
import SearchBox from './components/SearchBox';

// TODO: Parse JSON response
function parseData(json) {
  const arr = [];
  for (let prop in json) {
    if (json.hasOwnProperty(prop)) {
      let obj = json[prop];
      console.log('obj.entry[0] ' + obj.entry[0]);
      arr.push(obj.entry[0]);
    }
  }
  // log first child entry
  console.log(arr[0]);
}

async function loadJSON() {
  const response = await fetch(API_URL);
  const json = await response.json();
  // console.log(json);
  parseData(json);
}

function App() {
  // const { results, setResults } = useState(albums);

  // onLoad
  useEffect(() => {
    loadJSON();
  }, []);

  return (
    <div className='container'>
      <div>
        <h1>Hello World</h1>
      </div>
      <SearchBox />
      <div id='results' className='results'></div>
    </div>
  );
}

export default App;
