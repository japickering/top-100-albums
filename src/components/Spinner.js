import React from 'react';
import '../styles/spinner.css';

function init(max) {
  const arr = [];
  for (let i = 0; i < max; i++) {
    arr.push(<div key={i}></div>);
  }
  return arr;
}

export default function Spinner() {
  return (
    <div className='spinner'>
      {init(12)}
    </div>
  );
}
