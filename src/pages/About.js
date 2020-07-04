import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles, emphasize } from '@material-ui/core/styles';

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
}));

export default () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: 80, marginBottom: 15 }}>
        <Typography component="h1" variant="h2">
          About Us
        </Typography>
        <Typography paragraph variant="body1" className={classes.mainAbout}>
          <strong>L</strong>earn more to do more, with the best resources we teach you from start to
          finish for in-depth knowledge about a subject. No more doubt, we provide live teacher
          support for clear your doubts. Quick ways, tips and tricks are the part of out teaching.
        </Typography>
      </Container>
      <Typography paragraph variant="body2">
        <strong>A</strong>ll the people of our community including teacher, student, guides,
        technical support teams are the part of our journey, We going towards a brighter future for
        everyone. The world is continuously changing and update our courses accordingly, We teach
        you the on-demand courses to achieve your goals. You will be an expert from the beginner.
        Not too many courses and teachers to confuse you, we provide the best to you and save lots
        of times by not to searching for a full and understandable course. The one platform for all
        your education need. To start learning to{' '}
        <Link to="/#explore" className={classes.link}>
          explore our courses
        </Link>{' '}
        or join us{' '}
        <Link to="/sign-up" className={classes.link}>
          join us
        </Link>{' '}
        now to be a part of our community.
      </Typography>
    </Container>
  );
};
