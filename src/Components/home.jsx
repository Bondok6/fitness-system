import React, { Component } from 'react';
import axios from 'axios';
import style from '../assets/css/home.module.css';

export class Home extends Component {

  state = {};

  componentDidMount() {

    axios.get('profile')
      .then(res => {
        this.setState({
          user: res.data
        })
      }).catch(err => {
        console.error(err);
      });
    
  }

  render() {
    // if (this.state.user) {
    //   return (
    //     <div className="conatiner mt-5">
    //       <h2> You are login successfully </h2>
    //       <h3>Welcome, {this.state.user.username}</h3>
    //     </div>
    //   )
    // }
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default Home;
