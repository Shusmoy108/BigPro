import React, { Component } from 'react';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage';

import Axios from 'Utils/Axios';
import Loader from './Loader/Loader'
class Layout extends Component {
  constructor(props) {
        super(props);
        this.state = {
          logged: 'login',

          usertype: '',
          username: '',
        };

  }

  loggedIn = (data) => {
    this.setState({logged: 'loggedin', usertype: data.usertype, username: data.username});
  };

  handleLogout = (e) => {
    let that = this;
    Axios.logout(function(){
      that.setState({logged: 'login', name: '', username: ''})
      that.props.history.push('/');
    })
  };


  componentDidMount() {
      let that=this;
      Axios.getProfile(function(err, data){
          if (err) {
              console.log(err);
              that.setState({logged: 'login', name: '', username: ''});
          }
          else {
              that.setState({logged: 'loggedin', usertype: data.usertype, username: data.username});
          }
      })
  }

  render() {
    let template = <Loader />;

    if(this.state.logged === 'loggedin'){
      template = <LandingPage {...this.props}
                    usertype={this.state.usertype} username={this.state.username}/>
    }
    else if(this.state.logged === 'login') {
      template = <LoginPage loggedIn={this.loggedIn}/>
    }
    return (
      <div>
        {template}
      </div>
    );
  }
}

export default (Layout);
