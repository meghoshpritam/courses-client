import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  starIcon: {
    fontSize: 15,
    color: '#ffc400',
  },
}));

const Rating = ({ rating, totalRating }) => {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex' }} color="textPrimary">
      <div style={{ marginTop: 3, marginRight: 3 }}>
        {Array.from(Array(Math.floor(rating)).keys()).map((el) => (
          <StarIcon className={classes.starIcon} key={el} />
        ))}
        {rating - Math.floor(rating) > 0.2 && <StarHalfIcon className={classes.starIcon} />}
        {Array.from(
          Array(
            rating - Math.floor(rating) > 0.2 ? 5 - Math.ceil(rating) : 5 - Math.floor(rating)
          ).keys()
        ).map((el) => (
          <StarBorderIcon className={classes.starIcon} key={el} />
        ))}
      </div>
      <div>
        <strong> {rating} </strong>({totalRating})
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalRating: PropTypes.number.isRequired,
};

export default Rating;
