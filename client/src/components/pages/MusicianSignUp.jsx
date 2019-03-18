import React, { Component } from 'react';
import api from '../../api';

export default class MusicianSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      name: "",
      password: "",
      message: null,
      artistType:'musician',
      ytLink: ""
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
      ytLink: this.getVideoId(this.state.ytLink)
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.setUser()
        this.props.history.push("/home") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  getVideoId = (url) => {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return "https://www.youtube.com/embed/" + match[2];
    } else {
        return 'error';
    }
  }

  render() {
    return (
      <div className="Signup">
        <div className="grid align__item">
          <div className="login">
              <h4 className="form-title">Register as a Musician</h4>
              <form className="form" method="post" enctype="multipart/form-data">

                  <input name="photo" type="file" id="set-profile-picture" class="fancy-input" accept="image/x-png,image/gif,image/jpeg" required />

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
                    <input type="text" value={this.state.ytLink} name="ytLink" placeholder="youtube link" onChange={this.handleInputChange} />
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