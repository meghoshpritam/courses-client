import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ open, setOpen }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [refundId, setRefundId] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const pay = async () => {
    let res;
    try {
      res = await axios.get('/transaction/payment-capture');
      res = res.data;
    } catch (err) {
      console.log('error: ', err);
    }
    console.log('print', res);

    const option = {
      key: process.env.RZP_KEY,
      amount: 800,
      currency: res.currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: res.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler(response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'Gaurav Kumar',
      },
    };

    const rPay = new window.Razorpay(option);

    rPay.open();
  };

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    console.log('updated');
  });
  return (
    <div>
      {/* <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Enroll the course?</DialogTitle>
        <DialogContent>course details</DialogContent>
        <DialogActions> */}
      {/* <Button onClick={handleClose} color="primary">
        Disagree
      </Button> */}
      <Button onClick={pay} color="primary">
        Agree
      </Button>
      {/* </DialogActions>
      </Dialog> */}
    </div>
  );
};
