import React, { Component } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
import './Signup.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 7 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 5;
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({ newUser });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  };

  handleConfirmationSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  renderTooltip(props) {
    return (
      <div
        {...props}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          padding: '2px 10px',
          color: 'white',
          borderRadius: 3,
          ...props.style
        }}
      >
        Simple tooltip
      </div>
    );
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" bsSize="large">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autofocus
            placeholder="Code has been emailed to you"
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <div>Please check your email for the code.</div>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          variant="outline-dark"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Confirm"
          loadingText="&nbsp;Verifiying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Form.Group controlId="email" bsSize="large">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                <p>
                  Choose secure password. Use at least one capital and lower
                  case letter, and make it 8+ characters long.
                </p>
              </Tooltip>
            }
          >
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </OverlayTrigger>
        </Form.Group>
        <Form.Group controlId="confirmPassword" bsSize="large">
          <Form.Label>Confirm Password</Form.Label>
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                <p>Please type the same password again. Just to confirm.</p>
              </Tooltip>
            }
          >
            <Form.Control
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </OverlayTrigger>
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          variant="outline-dark"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Sign up"
          loadingText="&nbsp;Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
