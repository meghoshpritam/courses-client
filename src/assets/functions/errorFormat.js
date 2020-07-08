// eslint-disable-next-line import/prefer-default-export
export const format = (err) => {
  let errors = {};
  err.forEach((e) => {
    errors = { ...errors, [e.param]: e.msg };
  });
  return errors;
};
