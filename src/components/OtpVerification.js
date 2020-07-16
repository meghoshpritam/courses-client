import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const OtpVerification = ({
  value,
  onChange,
  submitHandler,
  error = false,
  helperText = '',
  err,
}) => {
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState(() => value || '');

  const apiCallState = useSelector((state) => state.apiCall);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    if (submitHandler !== undefined) {
      submitHandler();
    }
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      {apiCallState.loading && <LinearProgress />}
      <DialogTitle id="form-dialog-title">Verify Otp</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the otp to verify otp is send in your email.</DialogContentText>
        {err && (
          <Typography component="body1" color="error">
            {err}
          </Typography>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="tel"
          id="otp"
          label="OTP"
          name="otp"
          error={error}
          helperText={helperText}
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={apiCallState.loading}>
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" disabled={apiCallState.loading}>
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OtpVerification.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  submitHandler: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  err: PropTypes.string,
};

OtpVerification.defaultProps = {
  value: undefined,
  onChange: undefined,
  submitHandler: undefined,
  error: false,
  helperText: '',
  err: undefined,
};

export default OtpVerification;
