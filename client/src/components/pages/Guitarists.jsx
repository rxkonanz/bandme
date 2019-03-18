import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import { Redirect } from 'react-router-dom'

export default class Guitarists extends Component {

    state = {
        allGuitarists: []
    }

    componentDidMount() {
        this.getGuitarists();
    }

    getGuitarists = () => {
        Axios.get("http://localhost:5000/api/guitarists")
           .then(res => {
             let guitaristsArray = res.data.allGuitarists
             this.setState({
               allGuitarists: guitaristsArray
            })
        })
    }

    showGuitarists = () => {
        let result = this.state.allGuitarists.map((guitarist,i) => {
          return (<div className="col-xl-6 col-lg-6">
                    <iframe width="560" height="314" src={guitarist.ytLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p>{guitarist.username}</p>
                  </div>)
        })
        return result
      }

    render() {
        return(
            <div className="container">
                <div className="row">
                    {this.showGuitarists()}
                </div>
            </div>
        )
    }

}