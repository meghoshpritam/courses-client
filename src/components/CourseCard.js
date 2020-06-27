import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  hover: {
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
  priceAction: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={() => console.log('clicked')}>
      <CardMedia
        className={`${classes.cardMedia} ${classes.hover}`}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6" component="h3" className={classes.hover}>
          Heading
        </Typography>
        <Typography variant="body2" className={classes.hover}>
          This is a media card. You can use this section to describe the content.
        </Typography>
        <Typography variant="caption" color="textSecondary" className={classes.hover}>
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
          </Grid>
          <Grid item xs={12}>
            <div className={classes.priceAction}>
              <Typography variant="body1">
                <strong>&#8377; 50</strong>
              </Typography>
              <Button size="small" color="primary" variant="outlined">
                Enroll
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
