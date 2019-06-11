import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import TextInput from "../../app/common/form/TextInput";
import { createChat } from "./chatActions";

const mapState = state => ({
  loading: state.async.loading
});

const actions = {
  createChat
};

class ChatForm extends Component {
  handleSubmit = values => {
    this.props.createChat(values);
    this.props.reset();
  };

  render() {
    const { loading, createChat, error } = this.props;
    return (
        <Form
          autoComplete='off'
          className='myForm'
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        >
          <Row className='d-flex justify-content-between align-items-center'>
            <Col xs={10} md={10}>
              <Field
                name='content'
                className='myFormControl'
                placeholder='type your post here...'
                type='text'
                component={TextInput}
                autoFocus={true}
              />
              {error && (
                <Form.Group controlId='formBasicEmail'>
                  <Form.Text className='text-muted'>{error}</Form.Text>
                </Form.Group>
              )}
            </Col>
            <Col xs={2} md={2}>
              <Button variant='primary mainButton' type='submit'>
                {loading ? "…" : ">"}
              </Button>
            </Col>
          </Row>
        </Form>
    );
  }
}
export default connect(
  mapState,
  actions
)(reduxForm({ form: "createChat", enableReinitialize: true })(ChatForm));
