import React, { Component } from 'react';
import { API_URL } from './config';
import './App.css';

import SearchBox from './components/SearchBox';

function formatAlbumResults(obj) {
  // console.log(obj);
  const entries = [];
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const el = obj[key];
      entries.push({
        id: el.id.attributes['im:id'],
        title: el.title.label,
        artist: el['im:artist'].label,
        category: el.category.attributes.label,
        releaseDate: el['im:releaseDate'].attributes.label,
        datestamp: el['im:releaseDate'].label,
        thumbnail: el['im:image'][0].label,
        image1: el['im:image'][1].label,
        image2: el['im:image'][2].label,
        amount: el['im:price'].attributes.amount,
        currency: el['im:price'].attributes.currency,
      });
    }
  }
  return entries;
}

async function loadAlbums(context) {
  const response = await fetch(API_URL);
  const json = await response.json();
  let entry = {};

  for (const key in json) {
    if (Object.hasOwnProperty.call(json, key)) {
      const outer = json[key];
      entry = outer.entry;
      // console.log(entry);
      const results = formatAlbumResults(entry);
      context.setState({ 
        results: results, 
        filtered: results, 
      });
      break;
    }
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    loadAlbums(this);
  }

  render() {
    const { filtered } = this.state;
    return (
      <div className='container m-2'>
        <div className='m-3'>
          <h1 className='title text-light'>Top 100 Albums</h1>
          <SearchBox />
        </div>
        {filtered !== undefined && (
          <div className='results'>
            {filtered.map((item) => {
              return (
                <div key={item.id} className='card border-thin mt-2 mb-2 ml-2 p-3'>
                  <div className='title m-2'>
                    <h3 className='title text-center'>{item.title}</h3>
                  </div>
                  <img src={item.image2} alt='' className='thumbnail rounded' />
                  <div className='m-2'>
                    <span>Category: {item.category}</span>
                  </div>
                  <div className='m-2'>
                    <span>Release date: {item.releaseDate}</span>
                  </div>
                  <div className='m-2'>
                    <span>
                      Price: {item.amount} {item.currency}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
