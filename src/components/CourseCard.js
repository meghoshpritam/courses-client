import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import payment from '../assets/functions/payment';
import Rating from './Rating';
import { getYTVideoThumbnail } from '../assets/functions/util';

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
  instructorName: {
    fontWeight: 'bold',
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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

  priceAction: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
  },
}));

const CourseCard = ({
  title,
  description,
  creator,
  lastUpdated,
  rating,
  totalRating,
  price,
  img,
  video,
  type,
  id,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.card} onClick={() => console.log('clicked')}>
      <CardMedia
        className={`${classes.cardMedia} ${classes.hover}`}
        image={video ? getYTVideoThumbnail(video) : img}
        title={`${title}-image`}
        onClick={() => {
          history.push(`/${type}/${id}`);
        }}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6" component="h3" className={classes.hover}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.hover}>
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={`${classes.hover} ${classes.instructorName}`}
        >
          {creator}
        </Typography>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              <strong>{lastUpdated}</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              <Rating rating={rating} totalRating={totalRating} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.priceAction}>
              <Typography variant="body1">
                {price === 0 ? <strong>Free</strong> : <strong>&#8377; {price}</strong>}
              </Typography>
              <Button size="small" color="primary" variant="outlined" onClick={payment}>
                Enroll
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  totalRating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string,
  video: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
};

CourseCard.defaultProps = {
  img: undefined,
  video: undefined,
  type: 'course',
};

export default CourseCard;
