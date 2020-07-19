import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import useGet from '../hooks/useGet';
import CircleSpring from '../components/CircleSpring';
const useStyles = makeStyles((theme) => ({
  details: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    borderRadius: '50%',
    height: 200,
    width: 200,
    color: 'red',
  },
  customAvatar: {
    fontSize: '4rem',
    background: 'purple',
    height: 190,
    width: 190,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const { id } = useParams();
  const [res, err, get] = useGet();

  useEffect(() => {
    get('/profile', { id: id === 'me' ? localStorage.getItem('_id') : id });
  }, []);

  return (
    <Container maxWidth="lg">
      <Container maxWidth="md" style={{ marginTop: 80 }}>
        {res && (
          <Grid container className={classes.details}>
            <Grid item xs={12} sm={5}>
              {console.log('res', res)}
              {res.avatar ? (
                <img src={res.avatar} alt="profile_image" className={classes.img} />
              ) : (
                <div className={classes.customAvatar}>
                  <div>
                    {`${localStorage.getItem('name')[0]}${
                      localStorage.getItem('name').split(' ')[
                        localStorage.getItem('name').split(' ').length - 1
                      ][0]
                    }`}
                  </div>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="h4" component="h1">
                {localStorage.getItem('name')}
              </Typography>
              <Typography variant="h6" component="h2" color="textSecondary">
                &bull; {localStorage.getItem('role')} &bull;
              </Typography>
              <Typography variant="h6" component="h3">
                {res.join}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                component="body"
                style={{ textAlign: 'left', marginTop: 13 }}
              >
                <strong style={{ fontSize: '1.3rem' }}>About </strong>
                {res.about}
              </Typography>
            </Grid>
          </Grid>
        )}
        {!res && !err && <CircleSpring />}
        {err && (
          <Typography variant="h6" component="h2" color="error">
            An error occurs
          </Typography>
        )}
      </Container>
      {res && <Section title="My Courses" type="course" />}
    </Container>
  );
};
