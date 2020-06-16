import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // maxWidth: 280,
    // minWidth: 220,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  sectionContainer: {
    backgroundColor: 'red',
  },
  sectionTitle: {
    padding: theme.spacing(2, 0),
  },
  starIcon: {
    fontSize: 15,
    color: '#ffc400',
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Section = ({ title }) => {
  const classes = useStyles();
  // const cardContainerRef = useRef(null);

  // useEffect(() => {
  //   console.log('width', cardContainerRef.current ? cardContainerRef.current.offsetWidth : 0);
  // }, [cardContainerRef.current]);

  return (
    <div className={classes.sectionContainer}>
      <Typography variant="h5" component="h2" className={classes.sectionTitle}>
        {title}
      </Typography>
      <Grid
        container
        spacing={2}
        // ref={cardContainerRef}
      >
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card className={classes.card} onClick={() => console.log('clicked')}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h3">
                  Heading
                </Typography>
                <Typography variant="body2">
                  This is a media card. You can use this section to describe the content.
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Nams Sdkfjk
                </Typography>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="caption" color="textSecondary">
                      <strong>25/06/2020</strong>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="caption">
                      <div style={{ display: 'flex' }} color="textPrimary">
                        <div style={{ marginTop: 3, marginRight: 3 }}>
                          <StarIcon className={classes.starIcon} />
                          <StarIcon className={classes.starIcon} />
                          <StarIcon className={classes.starIcon} />
                          <StarHalfIcon className={classes.starIcon} />
                          <StarBorderIcon className={classes.starIcon} />
                        </div>
                        <div>
                          <strong> 4.3 </strong>(5646)
                        </div>
                      </div>
                    </Typography>
                    <Typography gutterBottom variant="body1" align="right">
                      <strong>&#8377; 50</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default function Album() {
  const classes = useStyles();

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Album layout
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Something short and leading about the collection below—its contents, the creator, etc.
            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
            entirely.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Main call to action
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Secondary action
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Section title="Top Courses" />
      </Container>
    </main>
  );
}
