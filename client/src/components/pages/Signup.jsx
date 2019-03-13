import React, { Component } from 'react';
import api from '../../api';

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
      message: null,
      artistType:'band'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      artistType: this.state.artistType
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.setUser()
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  bandOrMusician = (artistType) => {
    console.log("ARTIST TYPE")
    console.log(artistType)
    this.setState({
      artistType
    })
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <form>
          Username: <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} /> <br />
          Name: <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} /> <br />
          Password: <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} /> <br />
          Band<input checked={this.state.artistType === 'band'} onChange={(e)=>this.bandOrMusician('band')} type="radio" name="artistType" value="Band"/> 
          Musician<input checked={this.state.artistType === 'musician'} onChange={(e)=>this.bandOrMusician('musician')} type="radio" name="artistType" value="Musician"/>



          <br></br><button onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
}