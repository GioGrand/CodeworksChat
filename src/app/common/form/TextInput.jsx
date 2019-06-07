import React from "react";
import { Form } from "react-bootstrap";

const TextInput = ({
  label,
  input,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Group
      controlId={label}
      error={touched && !!error}
      width={width}
    >
      <Form.Label>{label}</Form.Label>
      <Form.Control
        {...input}
        placeholder={placeholder}
        type={type}
        
      />

      {touched && error && (
        <Form.Text className='text-muted'>{error}</Form.Text>
      )}
    </Form.Group>
  );
};

export default TextInput;
