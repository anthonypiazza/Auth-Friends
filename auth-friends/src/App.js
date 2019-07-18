import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import FriendList from './FriendList';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Link to='/'>Login</Link>
      <Link to='/friendlist'>Friend List</Link>  
      <Route 
        path='/' 
        render={props => {
          const token = localStorage.getItem('token');

          if (token) {
            return <Redirect to='/friendlist' />;
          }
          return <Login {...props} />
        }} />
      <Route 
        path='/friendlist' 
        render={props => {
          const token = localStorage.getItem('token');
          
          if(!token){
            return <Redirect to='/' />
          }
            return <FriendList {...props} />
        }} 
      />
    </div>
  );
}

export default App;
