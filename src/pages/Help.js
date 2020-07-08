import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  mainAbout: {
    margin: theme.spacing(3, 0),
  },
  leftMargin1st: {
    marginLeft: 10,
  },
  leftMargin2nd: {
    marginLeft: 20,
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: 80, marginBottom: 15 }}>
        <Typography component="h1" variant="h2">
          Need Help!
        </Typography>
        <Typography paragraph variant="body1" className={classes.mainAbout}>
          We are always with you don&apos;t worry be happy :)
        </Typography>
      </Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          How Can i help ypu
        </Grid>
        <Grid item xs={12} className={classes.leftMargin1st}>
          Account Related problem?
        </Grid>
        <Grid item xs={12} className={classes.leftMargin1st}>
          Payment related issues?
        </Grid>
        <Grid item xs={12} className={classes.leftMargin1st}>
          Course related issue?
        </Grid>
        <Grid item xs={12} className={classes.leftMargin2nd}>
          Class us on
          <Typography color="primary" display="inline">
            {' '}
            9876543210{' '}
          </Typography>
          form 10:00am to 10:00pm
        </Grid>
        <Grid item xs={12} className={classes.leftMargin1st} style={{ marginTop: 5 }}>
          Any problem in the website
        </Grid>
        <Grid item xs={12} className={classes.leftMargin2nd}>
          Report to <Link href="http://meghoshpritam.netlify.app">meghoshpritam</Link>
        </Grid>
      </Grid>
    </Container>
  );
};
