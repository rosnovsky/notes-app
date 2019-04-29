import React, { Component } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 7 &&
      !this.props.isAuthenticated
    );
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      isLoading: true
    });
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    } catch (e) {
      alert(`Error: ${e.message}`);
      this.setState({ isLoading: false });
    }
  };

  render() {
    // If user is unconfirmed, redirect them to purgatory
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autofocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              disabled={this.props.isAuthenticated}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              disabled={this.props.isAuthenticated}
            />
          </Form.Group>
          {!this.validateForm() ? (
            <>
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-bottom`}>
                    {this.props.isAuthenticated
                      ? 'Already Logged in'
                      : 'Please enter email and password (8+ characters).'}
                  </Tooltip>
                }
              >
                <LoaderButton
                  block
                  size="lg"
                  variant="outline-dark"
                  disabled={!this.validateForm()}
                  type="submit"
                  isLoading={this.state.isLoading}
                  text="Login"
                  loadingText="Logging in…"
                />
              </OverlayTrigger>
            </>
          ) : (
            <LoaderButton
              block
              size="lg"
              variant="outline-dark"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Login!"
              loadingText="&nbsp;Logging in…"
            />
          )}
        </form>
      </div>
    );
  }
}
