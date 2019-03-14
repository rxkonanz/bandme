import React, { Component } from 'react';
import api from '../../api';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null
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
    api.login(this.state.username, this.state.password)
      .then(result => {
        // console.log(api.getLocalStorageUser())
        // this.setState({user:api.getLocalStorageUser()})
        this.props.setUser()
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    console.log()
    return (
      <div className="Login">
        <div className="grid align__item">
          <div className="login">
            <h4 className="form-title">Login</h4>
            <form className="form">
              <div className="form__field">
                <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} placeholder="username" />
              </div>

              <div class="form__field">
                <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} placeholder="password"/>
              </div>

              <div class="form__field">
                  <input type="submit" onClick={(e) => this.handleClick(e)} value="Log In"></input>
                  <a href="/band-register">Don't have an Account? Register.</a>
              </div>
            </form>
            {this.state.message && <div className="info info-danger">
            {this.state.message}</div>}
          </div>
        </div>
      </div>
    );
  }
}
