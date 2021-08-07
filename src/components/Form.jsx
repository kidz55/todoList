import React, { useMemo, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  isRequired, isInTheFuture, isValidDate, validate,
} from '../helpers';

const useStyles = makeStyles(() => ({
  textField: {
    paddingTop: '0.2.rem',
  },
}));

const Form = ({
  form, onUpdate, onError, isDirty,
}) => {
  const classes = useStyles();
  const errors = useMemo(() => {
    const validator = {
      title(v) {
        return isRequired(v);
      },
      deadLine(v) {
        return isValidDate(v) && isInTheFuture(v);
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
        data-test-text-field-title
        placeholder="Task title"
        required
        className={classes.textField}
        error={errors.title && isDirty}
        value={form.title}
        label="title"
        onChange={(event) => {
          onUpdate({ ...form, title: event.target.value });
        }}
      />
      <TextField
        data-test-text-field-desc
        placeholder="Task description"
        label="description"
        className={classes.textField}
        value={form.description}
        onChange={(event) => {
          onUpdate({ ...form, description: event.target.value });
        }}
        multiline
        maxRows={4}
      />
      <TextField
        data-test-text-field-date
        id="datetime-local"
        label="Deadline"
        type="datetime-local"
        className={classes.textField}
        error={errors.deadLine && isDirty}
        value={form.deadLine || ''}
        onChange={(event) => {
          onUpdate({ ...form, deadLine: event.target.value });
        }}
        InputLabelProps={{
          shrink: true,
        }}
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
    deadLine: propTypes.string,
    description: propTypes.string,
  }).isRequired,
};

export default Form;
