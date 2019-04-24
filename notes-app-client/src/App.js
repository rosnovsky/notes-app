import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import Routes from './Routes';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
      // this.props.history.push('/');
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: true
    });
    // this.props.history.push('/');
  };

  handleLogout = async event => {
    await Auth.signOut()
      .then(
        this.setState({
          isAuthenticated: false
        })
      )
      .then(this.props.history.push('/login'));
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <Container>
            <Navbar bg="light" expand="lg" variant="light" collapseOnSelect>
              <Navbar.Brand>
                <Link to="/">Noted</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  {this.state.isAuthenticated ? (
                    <>
                      {/* <Nav.Item>{this.props.username}</Nav.Item> */}
                      <Nav.Item>
                        <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                      </Nav.Item>
                    </>
                  ) : (
                    <>
                      <Nav.Item>
                        <Nav.Link>
                          <Link to="/signup">Signup</Link>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link>
                          <Link to="/login">Login</Link>
                        </Nav.Link>
                      </Nav.Item>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(App);
