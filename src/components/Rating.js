import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const Rating = ({ rating, totalRating, fontSize }) => {
  const style = {
    fontSize,
    color: '#ffc400',
  };

  return (
    <div style={{ display: 'flex' }} color="textPrimary">
      <div>
        {Array.from(Array(Math.floor(rating)).keys()).map((el) => (
          <StarIcon style={style} key={el} />
        ))}
        {rating - Math.floor(rating) > 0.2 && <StarHalfIcon style={style} />}
        {Array.from(
          Array(
            rating - Math.floor(rating) > 0.2 ? 5 - Math.ceil(rating) : 5 - Math.floor(rating)
          ).keys()
        ).map((el) => (
          <StarBorderIcon style={style} key={el} />
        ))}
      </div>
      <div style={{ fontSize: fontSize - 3, marginLeft: 4 }}>
        <strong> {rating} </strong>({totalRating})
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalRating: PropTypes.number.isRequired,
  fontSize: PropTypes.number,
};

Rating.defaultProps = {
  fontSize: 15,
};

export default Rating;
