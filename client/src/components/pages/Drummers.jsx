import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'

export default class Drummers extends Component {

    state = {
        allDrummers: []
    }

    componentDidMount() {
        this.getDrummers();
    }

    getDrummers = () => {
        Axios.get("http://localhost:5000/api/drummers")
           .then(res => {
             let drummersArray = res.data.allDrummers
             this.setState({
               allDrummers: drummersArray
            })
        })
    }

    showDrummers = () => {
        let result = this.state.allDrummers.map((drummer,i) => {
          return (<div className="col-xl-6 col-lg-6">
                    <iframe width="560" height="314" src={drummer.ytLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>{drummer.username}</p>
                  </div>)
        })
        return result
      }

    render() {
        return(
            <div className="container">
                <h1 className="show-artists-title">Drummers looking for a Band:</h1>
                <div className="row">
                    {this.showDrummers()}
                </div>
            </div>
        )
    }

}