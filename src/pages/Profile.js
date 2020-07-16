import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import useGet from '../hooks/useGet';

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
}));

export default () => {
  const classes = useStyles();
  const { id } = useParams();
  const [res, err, get] = useGet();

  useEffect(() => {
    get('/profile', { id });
  }, []);

  return (
    <Container maxWidth="lg">
      <Container maxWidth="md" style={{ marginTop: 80 }}>
        <Grid container className={classes.details}>
          <Grid item xs={12} sm={5}>
            <img
              src="https://source.unsplash.com/random"
              alt="profile_image"
              className={classes.img}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Typography variant="h4" component="h1">
              Instructor Name
            </Typography>
            <Typography variant="h6" component="h2" color="textSecondary">
              &bull; Instructor &bull;
            </Typography>
            <Typography variant="h6" component="h3">
              Data Scientist | Finance Professional | Entrepreneur
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              component="body"
              style={{ textAlign: 'left', marginTop: 13 }}
            >
              <strong style={{ fontSize: '1.3rem' }}>About </strong>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptatibus et autem
              dolor ipsam obcaecati exercitationem aliquam amet odit debitis eveniet perferendis
              blanditiis maiores deserunt eaque ratione reiciendis voluptatem illum excepturi
              facilis magni, consequuntur officia nihil. Est natus repudiandae saepe soluta aperiam
              ex, eius minus excepturi aliquam magni, tempore vel praesentium perferendis odit vero
              corrupti expedita recusandae, nemo consequatur! Tenetur et at labore ad incidunt
              suscipit eaque iusto, dolore odio aliquid ullam voluptatibus rerum. Iure expedita
              autem asperiores neque veniam, sapiente aperiam, possimus tempora dolorum suscipit
              explicabo modi amet eos.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Section title="My Courses" cards={[1, 2, 3, 4, 5, 6, 7, 8]} />
    </Container>
  );
};
