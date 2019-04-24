import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { API } from 'aws-amplify';

import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './NewNote.css';

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: false,
      content: ''
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleFileChange = e => {
    this.file = e.target.files[0];
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Oof, too big. Pick a file smaller then ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB`
      );
      return;
    }
    this.setState({
      isLoading: true
    });

    try {
      await this.createNote({
        content: this.state.content
      });
      this.props.history.push('/');
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  };

  createNote(note) {
    return API.post('notes', '/notes', {
      body: note
    });
  }

  render() {
    return (
      <div className="NewNote">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              as="textarea"
              rows="3"
              onChange={this.handleChange}
              value={this.state.content}
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Attachment</Form.Label>
            <Form.Control onChange={this.handleFileChange} type="file" />
          </Form.Group>
          <LoaderButton
            block
            size="lg"
            variant="outline-dark"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Save"
            loadingText="&nbsp;Saving…"
          />
        </Form>
      </div>
    );
  }
}
