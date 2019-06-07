import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import TextInput from "../../app/common/form/TextInput";
import { createChat } from './chatActions';

const mapState = (state) => ({
    loading: state.async.loading
  }) 
  
  const actions = {
    createChat
  };

class ChatForm extends Component {
    render() {
        const { loading, createChat, error } = this.props;

        return (
            <Form
            className='mt-5 mb-5'
            onSubmit={this.props.handleSubmit(createChat)}
          >
            <Field
              label='chatPost'
              name='content'
              className='form-control'
              placeholder='type your post here...'
              type='text'
              component={TextInput}
            />
           
            {error && (
              <Form.Group controlId='formBasicEmail'>
                <Form.Text className='text-muted'>{error}</Form.Text>
              </Form.Group>
            )}
          
            <Button variant='primary' type='submit'>
            {loading ? 'Loading…' : 'Submit'}
            </Button>
          </Form>
        )
    }
}
export default connect(
    mapState,
    actions
  )(reduxForm({ form: "createChat", enableReinitialize: true })(ChatForm));
  