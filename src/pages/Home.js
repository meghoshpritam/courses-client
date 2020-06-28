import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Checkout from '../components/Checkout';
import Section from '../components/Section';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Album() {
  const classes = useStyles();
  const [checkout, setCheckout] = useState(false);

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Courses for you
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Never stope learning, We introduce you the courses you need for your success. Are you
            miss your physical class room due to Covid19 we introduce you the digital class room
            with professional teacher support and accomplish your dream goals.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    window.location.href = '/#explore';
                  }}
                >
                  Explore the courses
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Join to our community now
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="lg" id="explore">
        {/* End hero unit */}
        <Section title="Top Courses" cards={cards} viewAll="/view-all/courses" />
        <div style={{ margin: 60 }} />
        <Section title="Goals" cards={cards} />
        <div style={{ margin: 60 }} />
        <Section title="Projects" cards={cards} viewAll="/view-all/projects" />
      </Container>
      {checkout && <Checkout open={checkout} setOpen={setCheckout} />}
    </main>
  );
}
