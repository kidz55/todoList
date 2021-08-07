import moment from 'moment';

export const isRequired = (v) => !!v || v === 0;

export const isInTheFuture = (v) => {
  if (!v) return true;
  return moment(v).diff(moment(), 'seconds') > 0;
};

export const isValidDate = (v) => {
  if (!v) return true;
  return moment(v).isValid();
};

export const validate = (values = {}, validator = {}) => Object.entries(values)
  .reduce((acc, [key, value]) => {
    if (!validator[key]) return acc;
    const isValid = validator[key];
    acc[key] = !isValid(value);
    return acc;
  }, {});
