import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'

export default class Home extends Component {

  state = {
    artistType: localStorage.artistType,
    homeData: []
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
        let musiciansArray = res.data.allMusicians
        this.setState({
          homeData: musiciansArray
        })
      })
  }

  getBands = () => {
    Axios.get("http://localhost:5000/api/all-bands")
      .then(res => {
        let bandsArray = res.data.allBands
        this.setState({
          homeData: bandsArray
        })
      })
  }

  showData = () => {
    let result = this.state.homeData.map((element,i) => {
      return (<p key={i}> {element.username}</p>)
    })
    return result
  }

  render() {    
    return (  
      <div className="Home">
        {this.logIn()}
        {this.showData()}
      </div>
    );
  }
}