import React, { Component } from 'react';
import { API_URL } from './config';
import './App.css';
import './styles/flex.css';
import './styles/colours.css';
import './styles/spacing.css';

import SearchBox from './components/SearchBox';
import Spinner from './components/Spinner';

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
      console.log(entry);
      const results = formatAlbumResults(entry);
      context.setState({
        results: results,
        filtered: results,
        // loading: false
      });
      break;
    }
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    loadAlbums(this);
  }

  render() {
    const { loading, filtered } = this.state;
    return (
      <div className='container background-midgrey'>
        <header className='header p-3'>
          <h1 className='text-lightgrey'>Music Library</h1>
          <SearchBox />
        </header>
        {loading && <Spinner />}
        {filtered !== undefined && (
          <div className='results flex mt-1'>
            {filtered.map((item) => {
              return (
                <div key={item.id} className='card background-light mt-2 mb-2 ml-2 p-2'>
                  <div className='card-header m-2 pb-2'>
                    <h3 className='text-lightgrey'>{item.artist}</h3>
                  </div>
                  <img src={item.image2} alt='' className='thumbnail rounded' />
                  <div className='card-footer m-2 pb-2'>
                    <div className='m-2'>
                      <span className='text-midgrey'>Category:</span> {item.category}
                    </div>
                    <div className='m-2'>
                      <span className='text-midgrey'>Release date:</span> {item.releaseDate}
                    </div>
                    <div className='m-2'>
                      <span className='text-midgrey'>Price:</span> {item.amount} {item.currency}
                    </div>
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
