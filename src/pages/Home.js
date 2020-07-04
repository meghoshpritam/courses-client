import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Section from '../components/Section';
import useRpay from '../hooks/useRpay';
import useGet from '../hooks/useGet';
import Image from '../assets/images/image.svg';
import CircleSpring from '../components/CircleSpring';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 0, 6),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  heroButtons: {
    marginTop: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(30),
  },
}));

export default function Album() {
  const classes = useStyles();
  const history = useHistory();
  const [res, err, get] = useGet();

  useRpay();

  useEffect(() => {
    get('/pages/home');
  }, []);

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Courses for you
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={Image} alt="hero" className={classes.image} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className={classes.heroDescription}
              style={{ display: 'flex' }}
            >
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Never stope learning, We introduce you the courses you need for your success. Are
                you miss your physical class room due to Covid19 we introduce you the digital class
                room with professional teacher support and accomplish your dream goals.
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        history.push('/sign-up');
                      }}
                    >
                      Join to our community now
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      {/* End hero unit */}
      {res && (
        <Container className={classes.cardGrid} maxWidth="lg" id="explore">
          <Section
            title="Top Courses"
            data={res?.courses}
            viewAll="/view-all/courses"
            type="course"
          />
          <div style={{ margin: 60 }} />
          <Section title="Goals" data={res?.goals} type="goal" />
          <div style={{ margin: 60 }} />
          <Section
            title="Projects"
            data={res?.projects}
            viewAll="/view-all/projects"
            type="project"
          />
        </Container>
      )}
      {!res && !err && <CircleSpring />}
    </main>
  );
}
