import React from 'react';
import TextField from '@material-ui/core/TextField';
import propTypes from 'prop-types';

const Form = ({ form, onUpdate }) => (
  <form noValidate autoComplete="off">
    <TextField
      placeholder="Task title"
      defaultValue={form.title}
      label="title"
      onChange={(event) => {
        onUpdate({ ...form, title: event.target.value });
      }}
    />
    <TextField
      placeholder="Task description"
      label="description"
      defaultValue={form.description}
      onChange={(event) => {
        onUpdate({ ...form, description: event.target.value });
      }}
      multiline
      maxRows={4}
    />
  </form>
);

Form.propTypes = {
  onUpdate: propTypes.func.isRequired,
  form:
      propTypes.shape({
        title: propTypes.string,
        description: propTypes.string,
      }).isRequired,

};

export default Form;
