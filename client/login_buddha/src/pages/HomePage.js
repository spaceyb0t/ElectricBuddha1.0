import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { withUser } from '../services/withUser';

class HomePage extends Component {
  state = {
    stuff: null
  }
  componentDidMount() {
    if (!this.props.user) {
      return;
    }

    axios.get('/api/dashboard')
      .then(res => {
        this.setState({
          stuff: res.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          stuff: []
        });
      });
  }
  render() {
    const { user } = this.props;
    const { stuff } = this.state;

    return (
      <Fragment>
        {user && stuff &&
          <div>
            Welcome back, {user.username}!
          </div>
        }
        {user && !stuff &&
          <div>Hold on, looking for your stuff...</div>
        }
        {!user &&
          <div>Register and log in using the link above</div>
        }
      </Fragment>
    );
  }
}

export default withUser(HomePage);
