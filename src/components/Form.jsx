import React, { useMemo, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import propTypes from 'prop-types';
import { isRequired, validate } from '../helpers';

const Form = ({ form, onUpdate, onError, isDirty }) => {
  const errors = useMemo(() => {
    const validator = {
      title(v) {
        return isRequired(v);
      },
    };
    return validate(form, validator);
  }, [form]);

  useEffect(() => {
    const hasErrors = Object.values(errors).some((v) => v);
    onError(hasErrors);
  }, [errors, onError]);

  return (
    <form autoComplete="off">
      <TextField
        placeholder="Task title"
        required
        error={errors.title && isDirty}
        value={form.title}
        label="title"
        onChange={(event) => {
          onUpdate({ ...form, title: event.target.value });
        }}
      />
      <TextField
        placeholder="Task description"
        label="description"
        value={form.description}
        onChange={(event) => {
          onUpdate({ ...form, description: event.target.value });
        }}
        multiline
        maxRows={4}
      />
    </form>
  );
};

Form.propTypes = {
  onUpdate: propTypes.func.isRequired,
  onError: propTypes.func.isRequired,
  isDirty: propTypes.bool.isRequired,
  form: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
  }).isRequired,
};

export default Form;
