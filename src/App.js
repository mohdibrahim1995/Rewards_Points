import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList';

const App = React.memo(() => {
  return (
    <div className="App">
      <CustomerList />
    </div>
  );
});

export default App;
