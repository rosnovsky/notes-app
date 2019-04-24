import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './NewNote.css';

class NewNote extends Component {
  constructor(props) {
    super();

    this.file = null;

    this.state = {
      isLoading: false,
      content: ''
    };
  }

  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Attachment</Form.Label>
            <Form.Control onChange={this.handleFileChange} type="file" />
          </Form.Group>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}

export default NewNote;
