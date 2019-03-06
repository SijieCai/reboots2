import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h1>Entry1</h1>
    <p><a herf="/Entry2">click here to Entry2</a></p>
  </div>
);
ReactDOM.render(<App />, document.getElementById('app'));
