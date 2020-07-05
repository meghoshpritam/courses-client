import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';
import OtpVerification from '../components/OtpVerification';
import usePost from '../hooks/usePost';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [res, err, cb] = usePost();
  const [otp, setOtp] = useState('');
  const [otpRes, otpErr, otpCb] = usePost();
  const [signOutAll, setSignOutAl] = useState(false);
  const [otpDialog, setOtpDialog] = useState(false);

  useEffect(() => {
    if (signOutAll) {
      setSignOutAl(false);
      setOtp('');
      setOtpDialog(false);
    }
    if (!signOutAll && otpRes) {
      const keys = Object.keys(otpRes);
      keys.forEach((key) => {
        localStorage.setItem(key, otpRes[key]);
        setOtpDialog(false);
        history.push('/');
      });
    }
  }, [otpRes, history]);

  const submitHandler = (event) => {
    event.preventDefault();
    cb('/auth/sign-in', { email });
    setOtpDialog(true);
  };

  const signOutAllHandler = () => {
    cb('/auth/sign-out-all', { email });
    setSignOutAl(true);
    setOtpDialog(true);
  };

  const register = () => {
    if (signOutAll) otpCb('/auth/sign-out-all-otp-verify', { token: res.token, otp });
    else otpCb('/auth/sign-in-otp-verify', { token: res.token, otp });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {!!err?.error && (
          <Typography variant="body1" color="error">
            {err?.error}
          </Typography>
        )}
        <form className={classes.form} noValidate={false} onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={!!err?.email}
            helperText={err?.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {err?.email === 'You can access your account from maximum 3 device!' && (
            <Button
              onClick={signOutAllHandler}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Out all
            </Button>
          )}
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-up" className={classes.link}>
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
        {res && otpDialog && (
          <OtpVerification
            value={otp}
            onChange={setOtp}
            error={!!otpErr?.otp}
            helperText={otpErr?.otp}
            submitHandler={register}
            err={otpErr?.error}
          />
        )}
      </div>
    </Container>
  );
}
