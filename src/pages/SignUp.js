import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import usePost from '../hooks/usePost';
import OtpVerification from '../components/OtpVerification';

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
    marginTop: theme.spacing(3),
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

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [state, setState] = useState({ name: '', email: '' });
  const [otp, setOtp] = useState('');
  const [res, err, cb] = usePost();
  const [otpRes, otpErr, otpCb] = usePost();

  const changeState = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    cb('/auth/sign-up', { email: state.email, name: state.name });
  };

  const register = async () => {
    otpCb('/auth/sign-up-otp-verify', { token: res.token, otp });
  };

  useEffect(() => {
    if (otpRes) {
      const keys = Object.keys(otpRes);
      keys.forEach((key) => {
        localStorage.setItem(key, otpRes[key]);
        history.push('/');
      });
    }
  }, [otpRes, history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {!!err?.error && (
          <Typography variant="body1" color="error">
            {err?.error}
          </Typography>
        )}
        <form className={classes.form} noValidate={false} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={state.name}
                onChange={changeState('name')}
                error={!!err?.name}
                helperText={err?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={changeState('email')}
                error={!!err?.email}
                helperText={err?.email}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in" className={classes.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {res && (
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
