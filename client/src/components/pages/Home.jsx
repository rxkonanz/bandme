import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'

export default class Home extends Component {

  state = {
    artistType: this.props.user.artistType
  }

  componentDidMount() {
    if(this.state.artistType === "band"){
      this.getMusicians()
    }
    else {
      this.getBands()
    }
  }

  logIn = () => {
    if(!api.isLoggedIn()){ //DO THIS ONE
      return (
        <Redirect to="/login" />
      )
    }
  }

  getMusicians = () => {
    Axios.get("http://localhost:5000/api/all-musicians")
      .then(res => {
        console.log(res.data.allMusicians)
        let musiciansArray = res.data.allMusicians;
        musiciansArray.map((musician,i) => {
          return <p>{musician.username}</p>
        })
      })
  }

  getBands = () => {
    Axios.get("http://localhost:5000/api/all-bands")
      .then(res => {
          console.log(res.data)
          res.data.allBands.map((band,i) => {
            return <p>{band.username}</p>
          })
      })
  }

  render() {    
    return (  
      <div className="Home">
        {this.logIn()}
      </div>
    );
  }
}