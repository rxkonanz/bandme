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
        <div className="grid align__item">
          <div className="login">
              <h4 className="form-title">Register</h4>
              <form className="form">
                  <div className="form__field">
                    <input type="text" value={this.state.username} name="username" placeholder="username" onChange={this.handleInputChange} />
                  </div>
                  
                  <div className="form__field">
                    <input type="text" value={this.state.name} name="name" placeholder="name" onChange={this.handleInputChange} />
                  </div>

                  <div class="form__field">
                    <input type="password" value={this.state.password} name="password" placeholder="password" onChange={this.handleInputChange} />
                  </div>

                  Band <input checked={this.state.artistType === 'band'} className="choose-type" onChange={(e)=>this.bandOrMusician('band')} type="radio" name="artistType" value="Band"/>
                  Musician <input checked={this.state.artistType === 'musician'} className="choose-type" onChange={(e)=>this.bandOrMusician('musician')} type="radio" name="artistType" value="Musician"/>

                  <div class="form__field">
                    <input type="submit" onClick={(e) => this.handleClick(e)} value="Register"></input>
                    <a href="/login">Already have an Account? Log In.</a>
                  </div>
              </form>
              {this.state.message && <div className="info info-danger">
              {this.state.message}
              </div>}
          </div>
        </div>

        {/* <form>
          Username: <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} /> <br />
          Name: <input type="text" value={this.state.name} name="name" onChange={this.handleInputChange} /> <br />
          Password: <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} /> <br />
          Band<input checked={this.state.artistType === 'band'} onChange={(e)=>this.bandOrMusician('band')} type="radio" name="artistType" value="Band"/> 
          Musician<input checked={this.state.artistType === 'musician'} onChange={(e)=>this.bandOrMusician('musician')} type="radio" name="artistType" value="Musician"/>
          <br></br><button onClick={(e) => this.handleClick(e)}>Signup</button>
        </form> */}
        
      </div>
    );
  }
}