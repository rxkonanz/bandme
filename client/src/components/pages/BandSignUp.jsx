import React, { Component } from 'react';
import api from '../../api';

export default class BandSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
      message: null,
      artistType:'band',
      ytLink: "",
      imgLink: "",
      instrument: "guitarist"
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
      artistType: this.state.artistType,
      ytLink: "",
      imgLink: this.state.imgLink,
      instrument: ""
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.setUser()
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        <div className="grid align__item">
          <div className="login">
              <h4 className="form-title">Register as a Musician</h4>
              <form className="form" method="post" enctype="multipart/form-data">

                  <input name="photo" type="file" id="set-profile-picture" class="fancy-input" onChange={this.handleInputChange} required />

                  <div className="form__field">
                    <input type="text" value={this.state.username} name="username" placeholder="username" onChange={this.handleInputChange} />
                  </div>
                  
                  <div className="form__field">
                    <input type="text" value={this.state.name} name="name" placeholder="name" onChange={this.handleInputChange} />
                  </div>

                  <div class="form__field">
                    <input type="password" value={this.state.password} name="password" placeholder="password" onChange={this.handleInputChange} />
                  </div>
                  
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
      </div>
    );
  }
}