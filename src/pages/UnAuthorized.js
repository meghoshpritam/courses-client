import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(10, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  lockIcon: {
    fontSize: '2.5rem',
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography component="h1" color="error" variant="h2" align="center" gutterBottom>
          Unauthorized <LockOutlinedIcon className={classes.lockIcon} color="error" />
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          You are not authorized to access the resource
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.replace('/sign-in')}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={() => history.replace('/')}>
                Back to Home
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};
