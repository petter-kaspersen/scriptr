module.exports = function validateConfig(config) {
  let valid = true;
  let message = '';

  if (!config.name) {
    valid = false;
    message = 'Parameter name is required';
  }

  return {
    valid: valid,
    message,
  };
};
