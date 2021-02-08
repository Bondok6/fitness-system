import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


axios.defaults.baseURL = 'https://smartfitnessgym.herokuapp.com/api/v1';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(<App />,document.getElementById('root'));

