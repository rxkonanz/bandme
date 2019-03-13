import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'

export default class Home extends Component {

  


  logIn = () => {
    if(!api.isLoggedIn()){ //DO THIS ONE
      return (
        <Redirect to="/signup" />
      )
    }
  }

  render() {    
    

    return (
      
      <div className="Home">
        {this.logIn()}
         
        <h2>Home</h2>
        <p>This is a sample project with the MERN stack</p>
      </div>
    );
  }
}
