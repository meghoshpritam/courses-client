import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(10, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Oops! page not found!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          The page you are searching for is not found :(
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => history.push('/')}>
                Back to Home
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary" onClick={() => history.goBack()}>
                Back to previous page
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};
