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

export default ({ sumbitHandler }) => {
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState('');

  const apiCallState = useSelector((state) => state.apiCall);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmut = () => {
    if (sumbitHandler !== undefined) {
      sumbitHandler();
    }
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      {apiCallState.loading && <LinearProgress />}
      <DialogTitle id="form-dialog-title">Verify Otp</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the otp to verify otp is send in your email.</DialogContentText>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="tel"
          id="otp"
          label="OTP"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={apiCallState.loading}>
          Cancel
        </Button>
        <Button onClick={onSubmut} color="primary" disabled={apiCallState.loading}>
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};
